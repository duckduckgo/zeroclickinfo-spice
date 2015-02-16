package DDG::Spice::Cryptocurrency;
# ABSTRACT: Cryptocurrency converter and exchange rate lookup from www.cryptonator.com

use DDG::Spice;
with 'DDG::SpiceRole::NumberStyler';

# Get all the valid currencies from a text file.
# TODO Add script to update currency list
my @currTriggers;
my @currencies = share('cryptocurrencylist.txt')->slurp;
my %currHash = ();

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
    'aud',
    'cny',
    'eur',
    'gbp',
    'hkd',
    'jpy',
    'nzd',
    'pln',
    'rur',
    'sgd',
    'usd'
);

#Define regexes
# TODO 1. Add 'exchange rate, converted to' as possible match for $into_qr
my $currency_qr = join('|', @currTriggers);
my $question_prefix = qr/(?:convert|what (?:is|are|does)|how (?:much|many) (?:is|are))?\s?/;
my $rate_qr = qr/\s(?:rate|exchange|exchange rate|conversion)/i;
my $into_qr = qr/\s(?:en|in|to|in ?to|to)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $number_re = number_style_regex();
# Makes sure currency names like 42coin, 666coin, 66coin aren't treated as amounts
my $num_space_re = qr/$number_re\s/;

my $guard = qr/^$question_prefix($num_space_re*)\s?($currency_qr)(?:s)?(?:$into_qr|$vs_qr|$rate_qr|\s)?($num_space_re*)\s?($currency_qr)?(?:s)?\??$/i;

# http://www.cryptonator.com/api/secondaries?primary=BTC
# http://www.cryptonator.com/api/ticker/ltc-ftc

triggers query_lc => qr/$currency_qr/;

spice from => '([^/]+)/([^/]+)/([^/]*)';
spice to => 'http://www.cryptonator.com/api/$1/$2?primary=$3';
spice wrap_jsonp_callback => 1;

# This function converts things like "us dollars" to the standard "usd".
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

# This function is responsible for processing the input.
# - Setting default values.
# - Checking if the input number is valid.
sub checkCurrencyCode {
    my($amount, $from, $to) = @_;
    my %currencies = map { $_ => 1 } @excludedCurrencies;
    my $endpoint = '';
    my $query = '';
    my $query2 = '';
    
    # Check if it's a valid number.
    # If it isn't, return early.
    $amount =~ s/\s+$//;
    my $styler = number_style_for($amount);
    return unless $styler;
    
    my $normalized_number = $styler->for_computation($amount);
    
    # There are cases where people type in "2016 bitcoin", so we don't want to trigger on those queries.
    # The first cryptocoins appeared in 2008, so dates before that could be valid amounts.
    if($normalized_number >= 2008 && $normalized_number < 2100 && (length($from) == 0 || length($to) == 0)) {
        return;
    }
    
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
        if (exists($currencies{$from}) && exists($currencies{$from})) {
            return;
        }
        $endpoint = 'ticker';
        $query = $from . '-' . $to;
        $query2 = '';
    }
    # For a single currency, call the secondaries endpoint
    else {
        # Return early if the single currency is in the excluded list
        if (exists($currencies{$from})) {
            return;
        }
        $endpoint = 'secondaries';
        $query = $from;
        $query2 = $from;
    }
    return $endpoint, $query, $query2;
}

handle query_lc => sub {
    if (/$guard/) {
        my ($amount, $from, $alt_amount, $to) = ($1, $2, $3, $4 || '');
        
        # Exit early if two amounts are given
        if(length($amount) && length($alt_amount)) {
            return;
        }
        # Case where the first amount is available.
        elsif(length($amount)) {
            return checkCurrencyCode($amount, $from, $to);
        }
        # Case where the second amount is available.
        # We switch the $from and $to here.
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
