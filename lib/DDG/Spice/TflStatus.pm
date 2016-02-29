package DDG::Spice::TflStatus;
# ABSTRACT: Returs the Transport for London line status from the TfL API.

use strict;
use DDG::Spice;

spice to => 'https://api.tfl.gov.uk/Line/$1/Status?app_id=4b57df3f&app_key={{ENV{DDG_SPICE_TFLSTATUS_APIKEY}}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers end => 'line status', 'line tfl', 'line london', 'line underground', 'line london underground', 'line london tube', 'line tube';

handle remainder => sub {

    return '' if $_ eq '';

    if (lc($_) =~ /overground/) {
        return "london-overground";
    }
    elsif (lc($_) =~ /hammersmith.*?/) {
        return "hammersmith-city";
    }
    elsif (lc($_) =~ /waterloo.*?/) {
        return "waterloo-city";
    }

    return $_;
};

1;
