package DDG::Spice::Cryptocurrency;
# ABSTRACT: Cryptocurrency converter and exchange rate lookup provided by cryptonator.com
# Borrows from DDG::Spice:Currency
 
use DDG::Spice;
with 'DDG::SpiceRole::NumberStyler';

use YAML::XS qw(LoadFile);

# Get all the valid currencies from a text file.
my @currTriggers;
my @currencies = share('cryptocurrencylist.txt')->slurp;
my %currHash = ();
my $currDisplayName = '';

# link country codes to a currency symbol
my $currencyPerCountry = LoadFile share("currencyPerCountry.yml");

foreach my $currency (@currencies){
    chomp($currency);
    my @currency = split(/,/,$currency);
    push(@currTriggers, @currency);
    $currHash{$currency[0]} = \@currency;
}

# Used when a single currency is given in the query.
# These currencies should be handled by DDG::Spice::Currency or DDG::Spice::Bitcoin.
my @excludedCurrencies = (
    'btc',
    'eur',
    'gbp',
    'jpy',
    'rur',
    'usd',
    'uah',
);

# Used to filter on queries of the form '1 <cryptocurrency>'
# Top currencies from coinmarketcap.com/currencies/
my @topCurrencies = (
    'btc',
    'ltc',
    'eth',
    'dsh',
    'doge',
    'ppc',
);

# The currencies that we support in the UI
my @availableLocalCurrencies = (
    'usd',
    'cad',
    'gbp',
    'eur',
    'jpy',
    'rur',
    'uah'
);

#Define regexes
my $currency_qr = join('|', @currTriggers);
my $question_prefix = qr/(?:convert|what (?:is|are|does)|how (?:much|many) (?:is|are))?\s?/;
my $rate_qr = qr/\s(?:rate|exchange|exchange rate|conversion|price)/i;
my $into_qr = qr/\s(?:en|in|to|in ?to|to|from)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $number_re = number_style_regex();

my $guard = qr/^$question_prefix($number_re*?\s+|)($currency_qr)(?:s)?(?:$into_qr|$vs_qr|$rate_qr|\s)?($number_re*?\s+|)($currency_qr)?(?:s)?\??$/i;

triggers query_lc => qr/$currency_qr/;

spice from => '([^/]+)/([^/]+)/([^/]*)';
spice to => 'https://api.cryptonator.com/api/full/$2-$3';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => "200 1m";

# This function converts things like "us dollars" to the standard "usd".
sub getCode {
    my $input = shift;
    foreach my $key (keys %currHash) {
        if(exists $currHash{$key}) {
            my @currValues = @{$currHash{$key}};
            foreach my $value (@currValues) {
                if($input eq $value) {
                    # Set the display name of the currency
                    $currDisplayName = $currValues[1];
                    return $key;
                }
            }
        }
    }
}


# This function is responsible for processing the input.
sub checkCurrencyCode {
    my($amount, $from, $to) = @_;
    my %excludedCurrencies = map { $_ => 1 } @excludedCurrencies;
    my %topCurrencies = map { $_ => 1 } @topCurrencies;
    my %availableLocalCurrencies = map {$_ => 1} @availableLocalCurrencies;
    my $endpoint = '';
    my $query = '';
    my $query2 = '';
    
    # Check if it's a valid number.
    # If it isn't, return early.
    $amount =~ s/\s+$//;
    my $styler = number_style_for($amount);
    return unless $styler;
    
    my $normalized_number = $styler->for_computation($amount);
    
    # Handles queries of the form '1 <cryptocurrency>'
    # Avoids triggering on common queries like '1 gig' or '1 electron'
    # If the cryptocurrency is not in the top currencies list and the query does not include 'coin' then the spice is not triggered
    if ($normalized_number == 1 && !exists($topCurrencies{getCode($from)}) && index($from, 'coin') == -1) {
        return;
    }
    
    # There are cases where people type in "2016 bitcoin", so we don't want to trigger on those queries.
    # The first cryptocoins appeared in 2008, so dates before that could be valid amounts.
    if($normalized_number >= 2008 && $normalized_number < 2100 && (length($from) == 0 || length($to) == 0)) {
        return;
    }
    
    # Currency values are standardized
    $from = getCode($from) || '';
    $to = getCode($to) || '';
    
    # Return early if we get a query like "btc to btc".
    if($from eq $to) {
        return;
    }
    
    # Return early if we don't get a currency to convert from.
    if($from eq '') {
        return;
    }
    
    # If both currencies are available, use the ticker endpoint
    if (length($from) && length($to)) {
        # Return early if both currencies are in the excluded list
        # Allows searches like "ftc to aud" but excludes searches like "aud to usd"
        if (exists($excludedCurrencies{$from}) && exists($excludedCurrencies{$to})) {
            return;
        }
        $endpoint = 'ticker';
        $query = $from . '-' . $to;
        $query2 = $normalized_number;
    }
    # For a single currency, call the secondaries endpoint
    else {
        # Return early if the single currency is in the excluded list
        if (exists($excludedCurrencies{$from})) {
            return;
        }

        my $local_currency = getLocalCurrency();

        if($to eq '' && exists($availableLocalCurrencies{$local_currency})) {
            # use local currency if we support it in the ui
            $to = $local_currency;
        } 
        else {
            # default to btc
            $to = 'btc';
        }

        $endpoint = 'ticker';
        $query = $from . '-' . $to;
        $query2 = $normalized_number;
    }
    return $endpoint, $query, $query2;
}

# get the local currency where the user is
sub getLocalCurrency {
    my $local_currency = '';

    if ($loc && $loc->{country_code}) {
        my $country_code = lc $loc->{country_code};

        $local_currency = $currencyPerCountry->{$country_code} // '';

        # make sure we've got the currency in our list
        unless (exists $currHash{$local_currency}) {
            $local_currency = '';
        }
    }

    return $local_currency;
}

handle query_lc => sub {
    if (/$guard/) {
        my ($amount, $from, $alt_amount, $to) = ($1, $2, $3, $4 || '');
        
        # Exit early if two amounts are given
        if(length($amount) && length($alt_amount)) {
            return;
        }
        # Case where only ticker symbol is give.
        # Most cryptocurrency ticker symbols are already common acronyms that we don't want to trigger on them.
        # Done before standardizing currency value: "42coin?" and "100 ftc" will trigger spice, "42" and "ftc" will not.
        elsif (exists($currHash{$from}) && !length($to) && !length($amount)) {
            return;
        }
        # Case where the first amount is available.
        elsif(length($amount)) {
            return checkCurrencyCode($amount, $from, $to);
        }
        # Case where the second amount is available.
        elsif(length($alt_amount)) {
            return checkCurrencyCode($alt_amount, $to, $from);
        }
        # Case where neither of them are available.
        else {
            return checkCurrencyCode(1, $from, $to);
        }
    }
    return;
};

1;
