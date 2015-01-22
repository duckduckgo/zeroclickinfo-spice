package DDG::Spice::Medicine;
# Details about medicine from the database of myHealthbox.eu

use DDG::Spice;

spice is_cached => 1;

name "Medicine";
source "myHealthbox";
#icon_url "";
description "Succinct explanation of what this instant answer does";
primary_example_queries "aspirin dosage", "aspirin information leaflet";
secondary_example_queries "optional -- demonstrate any additional triggers";
category "facts";
topics "science", "everyday";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Medicine.pm";
attribution github => ["GitHubAccount", "Friendly Name"],
            twitter => "twitterhandle";

triggers startend => "information leaflet", "insert", "technical document", "dosage", "posology", "side effects", "contraindications", "active ingredients";

spice from => '([^/]*)/?([^/]*)';#expect medicine name/country_code

spice to => 'http://test.myhealthbox.eu/api/1.0/medicines/search?q=$1&country=$2&limit=5';

spice wrap_jsonp_callback => 1;

# Handle statement
handle query_lc => sub {
    #remove question marks and 'for'
    s/\? |for|//g;

    return unless $_;    # Guard against empty query

    my $country_code = $loc ? $loc->country_code : '';
    
    return $_, $country_code;
};

1;
