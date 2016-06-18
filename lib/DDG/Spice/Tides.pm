package DDG::Spice::Tides;
# ABSTRACT: High and Low Tide prediction for your location

use DDG::Spice;

spice is_cached => 1; #we can cache the response and just filter out the tide events that have already happened on the front

spice to => 'http://api.wunderground.com/api/{{ENV{DDG_SPICE_WUNDERGROUND_APIKEY}}}/tide/q/$1.json?callback={{callback}}';

triggers any => "tide", "tides";
triggers start => "tides for", "tide for", "tide in", "tides in", "tide times in";

handle remainder => sub {
    s/(when is|high|low|\?|\s)//g;
    return unless $_ eq '' || m/^\d{5}$/;

    if ((defined $loc && defined $loc->latitude && defined $loc->longitude) || $_){
        return join(',', $loc->latitude, $loc->longitude) if $_ eq '';
        return $_;
    }
    return;
};

1;
