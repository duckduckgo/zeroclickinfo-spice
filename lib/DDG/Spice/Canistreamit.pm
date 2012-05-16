package DDG::Spice::Canistreamit;

use DDG::Spice;

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {
    s/^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))\s*(.+)$/$1/i;
    s/\?$//;
    return $_;
};

1;
