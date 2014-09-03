package DDG::Spice::TflStatus;
# ABSTRACT: Returs the Transport for London line status from the TfL API.

use DDG::Spice;

primary_example_queries "victoria line status";
description "Shows the Transport for London line status";
name "TflStatus";
code_url "https://github.com/idlem1nd/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TflStatus.pm";
icon_url "/favicon.ico";
topics "travel";
category "time_sensitive";
attribution github  => ['https://github.com/idlem1nd', 'Tim Williams'],
            twitter => ['https://twitter.com/tim_wllms', 'Tim Williams'];

spice to => 'https://api.tfl.gov.uk/Line/$1/Status?app_id=4b57df3f&app_key=a3b1543277303ffaff1c3122044a6653';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

triggers end => 'line status', 'line tfl';

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
