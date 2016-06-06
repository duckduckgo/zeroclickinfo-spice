package DDG::Spice::Metar;

# Metar: Looks up the METAR information for a given airport. 
# The input should be a 4 letter ICAO code.
# It recognizes the query "metar ICAO" and "ICAO metar". 

use DDG::Spice;
use Geo::ICAO qw{ :airport };

spice to => 'http://avwx.rest/api/metar.php?station=$1&format=JSON&options=info,translate';
spice proxy_cache_valid => "418 1d"; # Do not cache responses.
spice wrap_jsonp_callback => 1;

triggers startend => 'metar';

handle words => sub {
    return if (scalar(@_) != 2); # Not enough parameters or too many.
    return $_[0] if ((length($_[0]) == 4) and defined(code2airport(uc($_[0]))));
    return $_[1] if ((length($_[1]) == 4) and defined(code2airport(uc($_[1]))));
    return; # There is no ICAO code in the query.
};

1;
