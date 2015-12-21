package DDG::Spice::Thumbtack;
# ABSTRACT: Returns service providers nearby

use DDG::Spice;

name "Thumbtack Search";
source "Thumbtack";
icon_url "https://www.thumbtack.com/favicon.ico";
description "Shows a list of service providers";
primary_example_queries "plumbers near me", "electricians close by";
category "location_aware";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Thumbtack.pm";
attribution github => ["http://github.com/whalenrp", "whalenrp"];

my @keywords = share('top_keywords.txt')->slurp;

spice to => 'https://www.thumbtack.com/search/$1/?callback={{callback}}&state=$2&city=$3';
spice from => '(.*)/(.*)/(.*)';

triggers any => @keywords;

# Handle statement
handle query_lc => sub {

    # Match only queries with "local" qualifiers.
    return unless $_ =~ m/^nearby|nearby$|near me$|around me$|close by$/;

    # Don't show results for users outside of the US or users without coordinates
    return unless $_
        && $loc
        && $loc->country_code eq 'US'
        && $loc->region
        && $loc->city;

    # Convert spaces to hyphens
    s/\ /-/g;

    return $_, $loc->region, $loc->city;
};

1;
