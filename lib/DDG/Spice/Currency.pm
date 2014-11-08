package DDG::Spice::Currency;
# ABSTRACT: Currency Convertor provided by XE.com

use DDG::Spice;
with 'DDG::SpiceRole::NumberStyler';

use Text::Trim;

primary_example_queries "convert 499 usd to cad";
secondary_example_queries "cad to usd", "cny?";
description "Currency Convertor provided by XE.com";
name "Currency";
source "XE.com";
icon_url "/i/xe.com.ico";
code_url "https://github.com/XenonLab/blob/master/lib/DDG/Spice/Currency.pm";
category "finance";
topics "economy_and_finance", "geography", "travel", "everyday";
attribution web => ['http://www.xe.com', 'xe.com'],
            github => ['https://github.com/laouji','Crimson Thompson'],
            twitter => ['https://twitter.com/laouji','Crimson Thompson'];

# Get all the valid currencies from a text file.
my @currTriggers;
my @currencies = share('currencylist.txt')->slurp;
my %currHash = ();

foreach my $currency (@currencies){
    chomp($currency);
    my @currency = split(/,/,$currency);
    push(@currTriggers, @currency);
    $currHash{$currency[0]} = \@currency;
}

# Define decimal unicode currency codes
my %currencyCodes = (36=>"USD",76=>"ALL",101=>"ALL",107=>"ALL",1547=>"AFN",402=>"AWG",1084=>"AZN",1072=>"AZN",1085=>"AZN",112=>"BYR",46=>"BYR",66=>"BZD",90=>"BZD",98=>"BOB",75=>"BAM",77=>"BAM",80=>"BWP",1083=>"BGN",1074=>"BGN",82=>"BRL",6107=>"KHR",165=>"CNY",8353=>"CRC",107=>"HRK",110=>"HRK",8369=>"CUP",75=>"CZK",269=>"CZK",107=>"DKK",114=>"DKK",82=>"DOP",68=>"DOP",163=>"EGP",107=>"EEK",114=>"EEK",8364=>"EUR",163=>"FKP",162=>"GHC",163=>"GIP",81=>"GTQ",163=>"GGP",76=>"HNL",70=>"HUF",116=>"HUF",107=>"ISK",114=>"ISK",8377=>"INR",82=>"IDR",112=>"IDR",65020=>"IRR",163=>"IMP",8362=>"ILS",74=>"JMD",165=>"JPY",163=>"JEP",1083=>"KZT",1074=>"KZT",8361=>"KPW",8361=>"KRW",1083=>"KGS",1074=>"KGS",8365=>"LAK",76=>"LVL",115=>"LVL",163=>"LBP",76=>"LTL",116=>"LTL",1076=>"MKD",1077=>"MKD",1085=>"MKD",82=>"MYR",77=>"MYR",8360=>"MUR",8366=>"MNT",77=>"MZN",84=>"MZN",8360=>"NPR",402=>"ANG",67=>"NIO",8358=>"NGN",8361=>"KPW",107=>"NOK",114=>"NOK",65020=>"OMR",8360=>"PKR",66=>"PAB",47=>"PAB",46=>"PAB",71=>"PYG",115=>"PYG",83=>"PEN",47=>"PEN",46=>"PEN",8369=>"PHP",122=>"PLN",322=>"PLN",65020=>"QAR",108=>"RON",101=>"RON",105=>"RON",1088=>"RUB",1091=>"RUB",1073=>"RUB",163=>"SHP",65020=>"SAR",1044=>"RSD",1080=>"RSD",1085=>"RSD",46=>"RSD",8360=>"SCR",83=>"SOS",82=>"ZAR",8361=>"KRW",8360=>"LKR",107=>"SEK",114=>"SEK",67=>"CHF",72=>"CHF",70=>"CHF",163=>"SYP",78=>"TWD",84=>"TWD",3647=>"THB",84=>"TTD",84=>"TTD",8378=>"TRY",8356=>"TRL",8372=>"UAH",163=>"GBP",85=>"UYU",1083=>"UZS",1074=>"UZS",66=>"VEF",115=>"VEF",8363=>"VND",65020=>"YER",90=>"ZWD");

# Define the regexes here.
my $currency_qr = join('|', @currTriggers);
my $into_qr = qr/\s(?:en|in|to|in ?to|to)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $question_prefix = qr/(?:convert|what (?:is|are|does)|how (?:much|many) (?:is|are))?\s?/;
my $number_re = number_style_regex();

# This regexp is responsible for actually processing the query and capturing the important parts.
my $guard = qr/^$question_prefix($number_re*)\s?($currency_qr)(?:s)?(?:$into_qr|$vs_qr|\s)?($number_re*)\s?($currency_qr)?(?:s)?\??$/i;

triggers query_lc => qr/$currency_qr/;

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.xe.com/tmi/xe-output.php?amount=$1&from=$2&to=$3&appid={{ENV{DDG_SPICE_CURRENCY_APIKEY}}}';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => "200 5m";

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
    
    # Check if it's a valid number.
    # If it isn't, return early.
    my $styler = number_style_for($amount);
    return unless $styler;
    
    # Choose the default currency.
    # If the user types in 10 usd, it should default to eur.
    # If the user types in 10 eur, it should default to usd.
    # my $default_to = getCode($from) eq "usd" ? "eur" : "usd"; 
    
    my $normalized_number = $styler->for_computation($amount);
    
    # There are cases where people type in "2016 euro" or "1999 php", so we don't want to trigger on those queries.
    if($normalized_number >= 1900 && $normalized_number < 2100 && (length($from) == 0 || length($to) == 0)) {
        return;
    }
    
    $from = getCode($from) || '';
    $to = getCode($to) || '';
    
    # Return early if we get a query like "usd to usd".
    if($from eq $to) {
        return;
    }
    
    # Return early if we don't get a currency to convert from.
    if($from eq '') {
        return;
    }
    
    # If we don't get a currency to convert to, e.g., the user types in "usd"
    # we set them to be the same thing. This will trigger our tile view.
    if($to eq '') {
        if($normalized_number == 1) {
            $to = $from;
        } else {
            # This should probably depend on the user's location.
            # For example, if I was in the Philippines, I would expect "10 usd" to mean "10 usd to php"
            # But this would mean mapping currencies to countries.
            $to = $from eq 'usd' ? 'eur' : 'usd';
        }
    }
    
    return $normalized_number, $from, $to;
}

handle query_lc => sub {

    if(/(\p{Currency_Symbol})/g) {
    my @c = $_;
    my $count = @c;
    print $count;
    if($count > 1) {
        print $currencyCodes{ord($c[0])};
        print $currencyCodes{ord($c[1])};
    } else {
        print $currencyCodes{ord($c[0])};
    }
        s/(\p{Currency_Symbol})/replacement/g;
    }

    if(/$guard/) {
        my ($amount, $from, $alt_amount, $to) = ($1, $2, $3, $4 || '');

        # If two amounts are available, exit early. It's ambiguous.
        # We use the length function to check if it's an empty string or not.
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
