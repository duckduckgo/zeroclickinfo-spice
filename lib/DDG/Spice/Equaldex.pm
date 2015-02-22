package DDG::Spice::Equaldex;
# ABSTRACT: LGBT Rights by region

use DDG::Spice;

spice is_cached => 1;

name "Equaldex";
source "equaldex";
icon_url "/i/equaldex.com.ico";
description "Show LGBT Rights by region";
primary_example_queries "lgbt china";
secondary_example_queries "lesbian rights cyprus", "gay rights cyprus", "bisexual rights cyprus", "transgender rights cyprus";
category "location_aware";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Equaldex.pm";
attribution github => ["MrChrisW", "Chris Wilson"],
            web => ["http://chrisjwilson.com", "Chris Wilson"];

spice to => 'http://equaldex.com/api/region?format=json&region=$1&callback={{callback}}';

triggers startend => "lgbt", "lesbian rights cyprus", "gay rights", "bisexual rights", "transgender rights";

# Handle statement
handle remainder => sub {
    return unless $_;
    return $_;
};

1;
