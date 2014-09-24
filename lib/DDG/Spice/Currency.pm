package DDG::Spice::Currency;
# ABSTRACT: Currency Convertor provided by XE.com

use DDG::Spice;
use Text::Trim;

primary_example_queries "convert 499 usd to cad", "499 GBP = ? JPY";
secondary_example_queries "cad to usd?", "cny?";
description "Currency Convertor provided by XE.com";
name "Currency";
source "XE.com";
icon_url "/i/xe.com.ico";
code_url "https://github.com/XenonLab/blob/master/lib/DDG/Spice/Currency.pm";
category "finance";
topics "economy_and_finance", "geography", "travel", "everyday";
attribution web => ['http://www.xe.com'];
                                                

my $curr ="";
my @currTriggers;
my @currencies = share('currencylist.txt')->slurp;
my %currHash = ();
foreach my $currency (@currencies){
    chomp($currency);
    my @currency = split(/,/,$currency);
    push(@currTriggers, @currency);
    $curr = join('|', @currTriggers);
    $currHash{$currency[0]} = \@currency;
}

triggers any => ('currency', 'currencies', @currTriggers);

spice from => '([^/]+)/([^/]+)/([^/]+)';
spice to => 'http://www.xe.com/tmi/xe-output.php?amount=$1&from=$2&to=$3&appid={{ENV{DDG_SPICE_CURRENCY_APIKEY}}}';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => "200 5m";

sub getCode{
    my $input= shift;
    foreach my $key(keys %currHash){
        my @currValues = @{$currHash{$key}};
        foreach my $value(@currValues){
            if($input eq $value){
                return $key;
            }
        }
    }
}

sub checkCurrencyCode{
    my($amount, $from, $to) = @_;
    return $amount, getCode($from)||"usd", getCode($to)||"cad";
}

my $amountReg = "\\d+(?:\.\\d+)?";

my $ws = "?:\\s*";


handle  query_lc => sub {
    
    if ($_ =~ s/\bcurrency\b|\bwhats\b|\bconvert\b|\bis\b|\bto\b|\bequals\b|\bequal\b|\bin\b|\?|\=|\~|\-//g){
        trim($_);
    }

    #400 cad
    if(/^($amountReg)($ws)($curr)$/){
        return checkCurrencyCode($1,$2,$2);
    }
    #400 usd 10 cad 
    elsif(/^($amountReg)($ws)($curr)($ws)($amountReg)($ws)($curr)$/){
        return checkCurrencyCode($1, $2, $4);
    }
    #400 usd cad 
    elsif(/^($amountReg)($ws)($curr)($ws)($curr)$/){
        return checkCurrencyCode($1, $2, $3);
    }
    #cad 400 euro
    elsif(/^($curr)($ws)($amountReg)($ws)($curr)$/){
        return checkCurrencyCode($2, $3, $1);
    
    }
    #cad usd 400 
    elsif(/^($curr)($ws)($curr)($ws)($amountReg)$/){
        return checkCurrencyCode($3, $1, $2);
    }
    #cad
    elsif(/^($curr)$/){
        return checkCurrencyCode("1",$1,$1);
    }
    #cad usd
    elsif(/^($curr)($ws)($curr)$/){
        return checkCurrencyCode("1",$1,$2);
    }
    
    
    return;
    
    
};
1;
