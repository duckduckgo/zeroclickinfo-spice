package DDG::Spice::Songkick::Events;

use strict;
use warnings;
use DDG::Spice;

triggers any => "///***never_trigger***///";

spice to => 'http://api.songkick.com/api/3.0/metro_areas/$1/calendar.json?apikey={{ENV{DDG_SPICE_SONGKICK_APIKEY}}}&per_page=10&jsoncallback={{callback}}';

handle remainder => sub {
  return  $_ if $_;
  return;
};

1;
