package DDG::Spice::UV;

# ABSTRACT: Use the web service provided by EPA to display the UV Index for locations in the US.
# The web service is described here: http://www.epa.gov/enviro/facts/services.html#uvindex

use strict;
use DDG::Spice;

spice is_cached => 1;

triggers startend => 'uv', 'uv index', 'current uv index';

spice from => '([^/]*)/?([^/]*)';

#hourly data - for the next version...
#spice to => 'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/CITY/$1/STATE/$2/JSON';

#daily data - just one value for the day...
spice to => 'https://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVDAILY/CITY/$1/STATE/$2/JSON';

#UV Index might change daily, but not in the middle of the night.
spice proxy_cache_valid => "200 304 4h";

spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    #remove question marks, "what is" questions
    s/\?|what|is|the|\s|current//gi;

    return if $_;

    #atm only works with automatically detected location of user
    return unless $loc;
    return unless (defined $loc->city and defined $loc->region);

    #and only if location is in the US
    return unless $loc->country_code eq 'US';

    return $loc->city, $loc->region;
};

1;
