package DDG::Spice::DetectLang;
# ABSTRACT: Detects language of words

use strict;
use utf8;
use DDG::Spice;

spice to   => 'http://ws.detectlanguage.com/0.2/detect?q=$1&key={{ENV{DDG_SPICE_DETECTLANGUAGE_APIKEY}}}';
spice wrap_jsonp_callback => 1;

triggers startend => 'detect language', 'identify language', 'what language', 'what language is',
             'determine language', 'check language';

handle remainder => sub {
    my ($str) = @_;

    return $str if $str;
    return
};

1;
