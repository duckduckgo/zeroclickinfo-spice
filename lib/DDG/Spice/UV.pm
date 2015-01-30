package DDG::Spice::UV;
# Use the web service provided by EPA to display the UV Index for locations in the US.
# The web service is described here: http://www.epa.gov/enviro/facts/services.html#uvindex

use DDG::Spice;

spice is_cached => 1;

name "UV Index";
source "EPA - United States Environmental Protection Agency";
description "Display the UV Index for the user's location in the US";
primary_example_queries "uv", "uv index";
category "location_aware";
topics "everyday", "travel", "geography";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/UV.pm";
attribution github => ["https://github.com/Bjoern", "Bjoern Guenzel"],
            twitter => ["https://twitter.com/fractality", "Bjoern Guenzel"],
            web => ["http://blinker.net", "Bjoern's Blog"];

# Triggers
triggers startend => 'uv', 'uv index', 'current uv index';

spice from => '([^/]*)/?([^/]*)';

#hourly data - for the next version...
#spice to => 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/CITY/$1/STATE/$2/JSON';

#daily data - just one value for the day...
spice to => 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVDAILY/CITY/$1/STATE/$2/JSON';

#UV Index might change daily, but not in the middle of the night. 
spice proxy_cache_valid => "200 304 4h";

spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    #remove question marks
    s/\?//g;
    
    return if $_;

    #atm only works with automatically detected location of user
    return unless $loc;
    return unless (defined $loc->city and defined $loc->region);
    
    #and only if location is in the US
    return unless $loc->country_code eq 'US';

    return $loc->city, $loc->region;
};

1;
