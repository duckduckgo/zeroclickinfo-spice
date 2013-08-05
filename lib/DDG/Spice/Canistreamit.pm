package DDG::Spice::Canistreamit;

use DDG::Spice;

primary_example_queries "watch pirates of the caribbean";
secondary_example_queries "Can I stream The Dark Knight";
description "Find out how to watch movies";
name "CanIStream.It";
icon_url "/i/www.canistream.it.ico";
source "CanIStream.It";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Canistreamit.pm";
topics "entertainment";
category "entertainment";
attribution github => ['https://github.com/CanIStreamIt','CanIStream.it'],
            twitter => ['https://twitter.com/CanIStreamIt','CanIStreamIt'],
            email => ['canistreamit@gmail.com','CanIStream.It'];

spice to => 'http://www.canistream.it/ddg/query/$1?callback={{callback}}';

triggers any => "stream", "watch", "streaming";

handle remainder => sub {

    my $remainder = $_;

    if ($remainder =~ /episodes?/){
        return;
    } else { 
        $remainder =~ s/\?//;
        $remainder =~ s/ online//i;

        if ($remainder =~ /^(?:can\s*i?|how\s*to|where\s*(?:to|can\s+i))?\s*(?:find\s+a)?\s*(.+)$/i) {
            return $1;
        }
    }

    return;
};

1;