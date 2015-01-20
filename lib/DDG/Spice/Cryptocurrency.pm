package DDG::Spice::Cryptocurrency;
# ABSTRACT: Cryptocurrency converter and exchange rate lookup from www.cryptonator.com
# Borrows a lot from the Currency Spice

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

#Define regexes
# TODO 1. Add 'exchange rate, converted to' as possible match for $into_qr
my $currency_qr = join('|', @currTriggers);
my $question_prefix = qr/(?:convert|what (?:is|are|does)|how (?:much|many) (?:is|are))?\s?/;
my $into_qr = qr/\s(?:en|in|to|in ?to|to)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $number_re = number_style_regex();

my $guard = qr/^$question_prefix($number_re*)\s?($currency_qr)(?:$into_qr|$vs_qr|\s)?($number_re*)\s?($currency_qr)?\??$/i;

# https://www.cryptonator.com/api/secondaries?primary=BTC
# https://www.cryptonator.com/api/ticker/btc-usd

triggers query_lc => qr/$currency_qr/;


spice from => '([^/]+)/([^/]+)/([^/]*)';

# Hack to get around cryptonator.com not accepting URL encoded strings.
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

# TODO Implenting happy path. Need to handle everything else.
handle query_lc => sub {
    my $endpoint = '';
    my $query = '';
    my $query2 = '';

    if (/$guard/) {
        my ($amount, $from, $alt_amount, $to) = ($1, $2, $3, $4 || '');
        
        # If both currencies are available, use the ticker endpoint
        if (length($from) && length($to)) {
            print ("Using /ticker endpoint\n");
            $endpoint = 'ticker';
            $query = $from . '-' . $to;
            $query2 = '';
        }
        else {
            print ("Using /secondaries endpoint\n");
            $endpoint = 'secondaries';
            $query = $from;
            $query2 = $from;
        }
        
        print "Endpoint = " . $endpoint . "\n";
        print "Query = " . $query . "\n";
        print "Query2 = " . $query2 . "\n";
        
        return $endpoint, $query, $query2;
    }
    return;
};

1;
