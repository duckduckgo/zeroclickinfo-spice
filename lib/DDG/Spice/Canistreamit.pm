package DDG::Spice::Canistreamit;
# ABSTRACT: Stream provider movie search

use strict;
use DDG::Spice;

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
