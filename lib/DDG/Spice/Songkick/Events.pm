package DDG::Spice::Songkick::Events;

use strict;
use warnings;
use DDG::Spice;

triggers any => "///***never_trigger***///";

spice to => 'http://api.songkick.com/api/3.0/metro_areas/$1/calendar.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=5';

spice wrap_jsonp_callback => 1;

spice proxy_cache_valid => "200 304 1d";

handle remainder => sub {
  return  $_ if $_;
  return;
};

1;
