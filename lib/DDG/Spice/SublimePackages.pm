package DDG::Spice::SublimePackages;
# ABSTRACT: Search for information about Sublime Text packages

use strict;
use DDG::Spice;

name "SublimePackages";
source "packagecontrol.io";
icon_url "/i/packagecontrol.io.ico";
description "Display Sublime Text packages";
primary_example_queries "sublimetext package code", "sublime text package php";
category "software";
topics "programming", "computing";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SublimePackages.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => ["http://chrisjwilson.com", "Chris Wilson"];

spice to => 'https://packagecontrol.io/search/$1.json';
spice wrap_jsonp_callback => 1;

triggers startend => "sublimetext package", "sublime text package", "sublime text packages", "sublime text";

handle remainder => sub {
    return unless $_;   
    return $_;
};

1;