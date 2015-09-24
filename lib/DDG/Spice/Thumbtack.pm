package DDG::Spice::Thumbtack;
# ABSTRACT: Returns service providers nearby

use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 1;

name "Thumbtack Search";
source "Thumbtack";
icon_url "https://www.thumbtack.com/favicon.ico";
description "Shows a list of service providers";
primary_example_queries "plumbers near me", "electricians close by";
category "location_aware";
topics "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Thumbtack.pm";
attribution github => ["http://github.com/whalenrp", "whalenrp"];

spice to => 'https://www.thumbtack.com/search/$1/?callback={{callback}}&state=$2&city=$3';
spice from => '(.*)/(.*)/(.*)';

triggers end => 'near me', 'around me', 'close by';
triggers startend => 'nearby';

# Handle statement
handle remainder => sub {

    # Don't show results for users outside of the US or users without coordinates
    return unless $_
        && $loc
        && $loc->country_code eq 'US'
        && $loc->region
        && $loc->city;

    # Remove symbols, convert spaces to hyphens, and convert to lowercase
    s/[^a-zA-Z ]//g;
    s/\ /-/g;

    return lc $_, $loc->region, $loc->city;
};

1;
