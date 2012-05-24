package DDG::Spice::Canistreamit;

use DDG::Spice;

attribution twitter => 'CanIStreamIt',
            web => ['http://canistream.it','CanIStream.It'],
            email => ['canistreamit@gmail.com','CanIStream.It'];

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {

    my $remainder = $_;
    
    $remainder =~ s/\?//;
    $remainder =~ s/ online//i;

    return unless $remainder =~ /^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))?\s*(?:find\s+a)?\s*(.+)$/i;
    return $1;
};

1;
