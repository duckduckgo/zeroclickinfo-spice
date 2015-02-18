package DDG::Spice::Bla;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice; 
triggers startend => 'bla'; 

spice to => 'http://api.getevents.co/event?lat=$1&lng=$2&limit=1';

spice from => '(?:([-+]?[0-9]*\.?[0-9]+)\-([-+]?[0-9]*\.?[0-9]+)|)';
spice wrap_jsonp_callback => 1; 

handle remainder => sub {
    return unless $loc && $loc->longitude && $loc->latitude;
    my $lng = $loc->longitude;
    my $lat = $loc->latitude;
    return "$lat-$lng";
};
1;
