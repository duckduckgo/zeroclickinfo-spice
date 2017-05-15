package DDG::Spice::Cryptomarketcap;

# ABSTRACT: Shows the marketcap for the main cryptocurrencies

use DDG::Spice;
use YAML::XS 'LoadFile';
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 1;

spice to => 'https://api.coinmarketcap.com/v1/ticker/$1';

triggers any => 'market cap', 'marketcap', 'volume', 'price', 'rank', 'supply', 'total supply', 'volume 24h', 'volume usd', 'price usd';

handle remainder_lc => sub {

    return if $_ eq '';
    
    my $value=$_;
    my $f='';

    my $table = LoadFile(share('coins.yml'));

    if(grep(/^$value$/i, values(%$table))) {
        $f = $value;
    }
    elsif(grep(/^$value$/i, keys(%$table))) {
        $f = $$table{$value};
    }

    $f =~ s/\s/-/g;
    
    return if $f eq '';
    return $f;
};

1;
