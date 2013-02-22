package DDG::Spice::Bitcoin::Address;

use DDG::Spice;

attribution web => ['http://dylansserver.com','Dylan Lloyd'],
            email => ['dylan@dylansserver.com','Dylan Lloyd'];

triggers any => 'bitcoin whois', 'btc whois';

spice to => 'http://blockchain.info/address/$1?format=json';

spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle remainder => sub {
    s/ ?address( of)? ?//;
    return $_;
};

1;
