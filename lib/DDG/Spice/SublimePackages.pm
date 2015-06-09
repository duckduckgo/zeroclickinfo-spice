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

triggers startend => "sublimetext package", "sublimetext packages", "sublime text package", "sublime text packages", "sublime text";

my $skip = join "|", share('skipwords.txt')->slurp(chomp => 1);

handle remainder => sub {
    return unless $_; 
    # Do not trigger IA if query matches any words in skipwords.txt file
    return if  m/$skip/i;  
    return $_;
};

1;