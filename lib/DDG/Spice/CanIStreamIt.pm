package DDG::Spice::CanIStreamIt;

use DDG::Spice;

spice to => 'http://staging.canistream.it/ddg/query/$1?callback={{callback}}';

triggers startend => "stream";

handle remainder => sub {
    return $_;
};

1;
