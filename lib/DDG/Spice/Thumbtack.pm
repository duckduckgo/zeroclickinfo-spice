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

# Require the "thumbtack " modifier explicitly for now.
my @keywords = share('top_keywords.txt')->slurp;
for (my $i=0; $i < scalar @keywords; $i++) {
    $keywords[$i] = "thumbtack " . $keywords[$i]
}

spice to => 'https://www.thumbtack.com/search/$1/?callback={{callback}}&state=$2&city=$3';
spice from => '(.*)/(.*)/(.*)';

triggers any => @keywords;

# Handle statement
handle query_lc => sub {

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
