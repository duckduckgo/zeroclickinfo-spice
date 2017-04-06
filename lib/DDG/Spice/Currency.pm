package DDG::Spice::Currency;
# ABSTRACT: Currency Convertor provided by XE.com

use strict;
use DDG::Spice;
with 'DDG::SpiceRole::NumberStyler';
use Text::Trim;
use YAML::XS qw(LoadFile);

# Get all the valid currencies from a text file.
my @currTriggers;
my @currencies = share('currencyNames.txt')->slurp;
my %currHash = ();

# load decimal => unicode currency codes
my $currencyCodes = LoadFile share("currencySymbols.yml");
# country code => currency code
my $currencyPerCountry = LoadFile share("currencyPerCountry.yml");

foreach my $currency (@currencies){
    chomp($currency);
    my @currency = split(/,/,$currency);
    push(@currTriggers, @currency);
    $currHash{$currency[0]} = \@currency;
}

# Define the regexes here.
my $currency_qr = join('|', @currTriggers);
my $into_qr = qr/\s(?:en|in|=(?:\s*\?\s*)?|to|in ?to|to)\s/i;
my $vs_qr = qr/\sv(?:ersu|)s\.?\s/i;
my $question_prefix = qr/(?:convert|what (?:is|are|does)|how (?:much|many) (?:is|are))?\s?/;
my $number_re = number_style_regex();
my $cardinal_re = join(' |', qw(hundred thousand k million m billion b trillion)).' ';
my $keyword_qr = qr/\s?currency\s?/i;


my $guard = qr/^$question_prefix(\p{Currency_Symbol})?\s?($number_re*)\s?(\p{Currency_Symbol})?\s?($cardinal_re)?\s?($currency_qr)?(?:s)?($keyword_qr)?(?:$into_qr|$vs_qr|\/|\s)?($number_re*)\s?($currency_qr)?(\p{Currency_Symbol})?(?:s)?($keyword_qr)?\??$/i;

triggers query_lc => qr/\p{Currency_Symbol}|$currency_qr/;

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
        my $local_currency = getLocalCurrency();

        if($normalized_number == 1) {
            $to = $from;
        } elsif ($local_currency) {
            $to = $local_currency;
        } else {
            # if we can't get the user's location, just default to USD/EUR
            $to = $from eq 'usd' ? 'eur' : 'usd';
        }
    }

    return $normalized_number, $from, $to;
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

    if(/$guard/) {

        my ($fromSymbol, $amount, $cardinal, $from, $currencyKeyword, $alt_amount, $to, $toSymbol) = ($1 || $3 || '', $2, $4 || '', $5 || '', $6 || '', $7 || '', $8 || '', $9 || '');


        if ($from eq '' && $fromSymbol) {
            $from = $currencyCodes->{ord($fromSymbol)};
        }

        if ($to eq '' && $toSymbol) {
            $to = $currencyCodes->{ord($toSymbol)};
        }
        
        # if only a currency symbol is present without "currency" keyword, then bail.
	return if ($amount eq '' && $to eq '' && $currencyKeyword eq '' && exists($currHash{$from}));

        my $styler = number_style_for($amount);
        return unless $styler;

        # only convert $amount if exists
        if ($cardinal ne '' && $amount ne '') {
            $amount = $styler->for_computation($amount);

            if ($cardinal =~ /(hundred )/i)  { $amount *= 100 }
            elsif ($cardinal =~ /(thousand |k )/i) { $amount *= 1_000 }
            elsif ($cardinal =~ /(million |m )/i)  { $amount *= 1_000_000 }
            elsif ($cardinal =~ /(billion |b )/i)  { $amount *= 1_000_000_000 }
            elsif ($cardinal =~ /(trillion |t )/i) { $amount *= 1_000_000_000_000 }
        } elsif($cardinal && $amount eq '') {
            return; # if cardinal provided but no amount return
        }

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
