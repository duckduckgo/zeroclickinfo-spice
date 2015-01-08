package DDG::Spice::UV;
# Use the web service provided by EPA to display UV Index for locations in the US.
# The web service is described here: http://www.epa.gov/enviro/facts/services.html#uvindex
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "UV Index";
source "EPA - United States Environmental Protection Agency";
#icon_url "";
description "Display the UV Index for a given location in the US";
primary_example_queries "uv", "uv index";
secondary_example_queries "optional -- demonstrate any additional triggers";
# see https://duck.co/duckduckhack/metadata#category
category "location_aware";
# see https://duck.co/duckduckhack/metadata#topics
topics "everyday", "travel", "geography";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/UV.pm";
attribution github => ["https://github.com/Bjoern", "Bjoern Guenzel"],
            twitter => ["https://twitter.com/fractality", "Bjoern Guenzel"];

# Triggers
#my @triggers = ('uv');
#triggers startend => @triggers;
triggers startend => 'uv';

spice from => '([^/]*)/?([^/]*)';

#hourly data - for the next version...
#spice to => 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/CITY/$1/STATE/$2/JSON';

#daily data - just one value for the day...
spice to => 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVDAILY/CITY/$1/STATE/$2/JSON';

spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {
    #atm only works with automatically detected location of user
#    return unless false;
    return unless $loc;
    #and only if location is in the US
    return unless $loc->country_code eq 'US';

    return $loc->city, $loc->region;
};

1;
