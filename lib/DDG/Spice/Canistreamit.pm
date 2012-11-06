package DDG::Spice::Canistreamit;

use DDG::Spice;

attribution twitter => 'CanIStreamIt',
            web => ['http://canistream.it','CanIStream.It'],
            email => ['canistreamit@gmail.com','CanIStream.It'];

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

primary_example_queries   => "watch back to the future";
secondary_example_queries => "how to stream pirates of silicon valley", "can i stream indie game";
description "Find out how to watch movies";
name "Canistreamit";
icon_url "/i/www.canistream.it.ico";
source "CanIStream.It";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Canistreamit.pm";
topics => "entertainment";
category => "entertainment";
attribution github => ['https://github.com/CanIStreamIt','CanIStream.it'],
           twitter => ['https://twitter.com/CanIStreamIt','CanIStream.It'];

handle remainder => sub {

    my $remainder = $_;
    
    $remainder =~ s/\?//;
    $remainder =~ s/ online//i;

    return unless $remainder =~ /^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))?\s*(?:find\s+a)?\s*(.+)$/i;
    return $1;
};

1;
