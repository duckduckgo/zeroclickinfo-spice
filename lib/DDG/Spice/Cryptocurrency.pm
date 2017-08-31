package DDG::Spice::Cryptocurrency;
# ABSTRACT: Cryptocurrency converter and exchange rate lookup provided by cryptonator.com
# Borrows from DDG::Spice:Currency

use DDG::Spice;
with 'DDG::SpiceRole::NumberStyler';

use YAML::XS qw(LoadFile);

# Get all the valid currencies from a text file.
my @currTriggers;
my @cryptoTriggers;
my @crypto_currencies = share('cryptocurrencylist.txt')->slurp;
my @fiat_currencies = share('FiatCurrencyList.txt')->slurp;
my @currencies = (@crypto_currencies, @fiat_currencies);
my %currHash = ();
my $currDisplayName = '';

# link country codes to a currency symbol
my $currencyPerCountry = LoadFile share("currencyPerCountry.yml");

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

# Handles ambiguities in the symbol names
my @nonTriggeringSymbols = (
    'ftc',
    'ppc',
    'nmc',
);

# Used to filter on queries of the form '1 <cryptocurrency>'
# Top currencies from coinmarketcap.com/currencies/
my @topCurrencies = (
    'btc',
    'bcc',
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
    'rub',
    'uah'
);

foreach my $currency (@currencies){
    chomp($currency);
    my @currency = split(/,/,$currency);

    push(@cryptoTriggers, @currency) unless(grep(/^$currency[0]$/, @availableLocalCurrencies) || grep(/^$currency[0]$/, @excludedCurrencies));

    push(@currTriggers, @currency);
    $currHash{$currency[0]} = \@currency;
}

my %excludedCurrencies = map { $_ => 1 } @excludedCurrencies;
my %topCurrencies = map { $_ => 1 } @topCurrencies;
my %availableLocalCurrencies = map {$_ => 1} @availableLocalCurrencies;

#Define regexes
my $currency_qr = join('|', @currTriggers);
my $crypto_qr = join('|', @cryptoTriggers);
my $question_prefix = qr/(?:convert|current value (?:of)?|what (?:is|are|does)|(?:conversion|exchange|fx) rate\s?(?:for)?|how (?:much|many) (?:is|are))?\s?/;
my $rate_qr = qr/\s(?:rate|exchange|(?:exchange|fx) rate|conver(?:sion|ter)|calc(?:ulator)?|price)/i;
my $into_qr = qr/\s(?:en|in|to|in ?to|to|from)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $number_re = number_style_regex();

my $crypto_triggers = qr/^(?:$crypto_qr)(?:\s$rate_qr)?$/i;
my $guard = qr/^$question_prefix($number_re*?\s+|)($currency_qr)(?:s)?(?:$into_qr|$vs_qr|$rate_qr|\s)?($number_re*?\s+|)($currency_qr)?(?:s)?\??$/i;
my $generic_triggers = qr/^(?:((?:crypto\s?(currency)?)\s?(?:calc(?:ulator)?|conver(?:sion|ter)|exchanges?)?)|(?:coin exchanges?))$/;

triggers query_lc => qr/$generic_triggers/;
triggers query_lc => qr/$currency_qr/;
triggers query_lc => qr/$crypto_triggers/;

spice from => '([^/]+)/([^/]+)/([^/]*)';
spice to => 'https://api.cryptonator.com/api/full/$2-$3';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => "200 1m";

spice alt_to => {
    cryptonator  => {
        from => '([^/]+)/([^/]*)',
        to => 'https://api.cryptonator.com/api/full/$1-$2',
        wrap_jsonp_callback => 0,
    }
};

# This function is responsible for processing the input.
sub checkCurrencyCode {
    my($amount, $from, $to, $generic) = @_;
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
    # If the cryptocurrency is not in the top currencies list, the query does not include a 'to' currency,
    # and the query doesn't include 'coin' then don't trigger
    if ($normalized_number == 1 && $to eq '' && exists($availableLocalCurrencies{getCode($from)}) ) {
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
        # Return early if both currencies are in the excluded list uncless a generic trigger
        # which will not trigger the currency spice
        # Allows searches like "ftc to aud" but excludes searches like "aud to usd"
        return if !$generic && (exists($excludedCurrencies{$from}) && exists($excludedCurrencies{$to}));
        $endpoint = 'ticker';
        $query = $from . '-' . $to;
        $query2 = $normalized_number;
    }
    # For a single currency, fall back to a default value (location or btc)
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

# Reduces triggers to their respective symbol. "us dollars" --> "usd".
sub getCode {
    my $input = shift;

    foreach my $key (keys %currHash) {
        if(exists $currHash{$key}) {
            my @currValues = @{$currHash{$key}};
            foreach my $value (@currValues) {
                if($input eq $value) {
                    return $key;
                }
            }
        }
    }
}

# retrieve the users local currency (if possible ~ default to USD)
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

    # generic type queries
    # ie. 'crypto currency', 'crypto exchange'
    if ($_ =~ qr/$generic_triggers/) {
        my $local_currency = getLocalCurrency();
        return checkCurrencyCode(1, 'btc', $local_currency, 1);
    }

    # all other queries
    # ie. 'ltc', 'feather coin calculator', 'eth to usd'
    if (/$guard/) {
        my ($amount, $from, $alt_amount, $to) = ($1, $2, $3, $4 || '');
        my $from_code = getCode($from);
        my $to_code = getCode($to);

        # Exit early if two amounts are given
        if(length($amount) && length($alt_amount)) {
            return;
        }
        # ignore queries that don't involve a cryptocurrency
        # these are handled by the Currency Spice
        elsif (defined $availableLocalCurrencies{$from_code} && defined $availableLocalCurrencies{$to_code}) {
            return;
        }
        # Case where the first amount is available.
        elsif(length($amount)) {
            return checkCurrencyCode($amount, $from, $to);
        }
        # Ignore if no amount and a non triggering symbol
        elsif (grep(/^$from$/, @nonTriggeringSymbols)) {
            return;
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
