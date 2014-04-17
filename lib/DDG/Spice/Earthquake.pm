package DDG::Spice::Earthquake;

use DDG::Spice;

name "Earthquake";
description "Displays information about recent earthquakes worldwide";
attribution github => ['https://github.com/', ''];

triggers startend => (
     'earthquake',
     'earthquakes'
    );

spice to => 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return '' if $_ eq '';
	return;
};

1;
