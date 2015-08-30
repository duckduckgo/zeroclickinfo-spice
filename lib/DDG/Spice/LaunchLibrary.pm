package DDG::Spice::LaunchLibrary;
# ABSTRACT: List upcoming rocket launches and where to watch them online

use strict;
use DDG::Spice;

spice is_cached => 1;

name "Launch Library";
source "LaunchLibrary.net";
description "List upcoming rocket launches and where to watch them online";
primary_example_queries "upcoming rocket launches", "next space launch";
category "reference";
topics "geek", "science";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/LaunchLibrary.pm";
attribution github => ["globalspin", "Chris Radcliff"],
            twitter => "chris_radcliff";

spice to => 'http://launchlibrary.net/1.1/launch/next/5';
spice wrap_jsonp_callback => 1;

triggers any => "rocket launches", "rocket launch", "space launches", "space launch";

handle remainder => sub {
    return 1;
};

1;
