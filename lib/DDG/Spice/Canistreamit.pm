package DDG::Spice::Canistreamit;

use DDG::Spice;

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {
    s/^can i//i;
    return $_;
};

1;
