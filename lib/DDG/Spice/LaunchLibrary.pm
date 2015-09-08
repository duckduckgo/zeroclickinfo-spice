package DDG::Spice::LaunchLibrary;
# ABSTRACT: List upcoming rocket launches and where to watch them online

use strict;
use DDG::Spice;

spice is_cached => 1;

name "Launch Library";
source "LaunchLibrary.net";
description "List upcoming rocket launches and where to watch them online";
primary_example_queries "upcoming rocket launches", "next space launch", "watch a rocket launch", "rocket launch schedule";
secondary_example_queries "upcoming rocket webcast", "next space webcast", "watch a space launch webcast";
category "reference";
topics "geek", "science";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/LaunchLibrary.pm";
attribution github => ["globalspin", "Chris Radcliff"],
            twitter => "chris_radcliff";

# Version 1.1 of the API allows GET requests. 
# Parameters are included in the URL path; "/next/10" shows the next 10 launches
# See launchlibrary.net for the API reference.
spice to => 'http://launchlibrary.net/1.1/launch/next/10';
spice wrap_jsonp_callback => 1;

triggers any => "rocket launches", "rocket launch", "space launches", "space launch";

handle query_lc => sub {
    return unless $_ =~ /^(watch|upcoming|next)*\s?(a)*\s*(space|rocket)\s?launch(es)*\s?(schedule|webcast)*$/;
};

1;
