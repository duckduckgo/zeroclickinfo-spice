package DDG::Spice::Canistreamit;

use DDG::Spice;

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {
    return unless /^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))\s*(.+)\??$/i;
    return $_;
};

1;
