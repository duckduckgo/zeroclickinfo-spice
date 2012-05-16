package DDG::Spice::Canistreamit;

use DDG::Spice;

attribution twitter = 'CanIStreamIt'
attribution website => ['http://canistream.it','CanIStream.It']
attribution email => ['canistreamit@gmail.com','CanIStream.It']

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {
    sub: s/^can i//;
    return $_;
};

1;
