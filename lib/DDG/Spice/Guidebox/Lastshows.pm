package DDG::Spice::Guidebox::Lastshows;
# ABSTRACT: Search for full free episodes for guidebox id of a TV show

use strict;
use DDG::Spice;

triggers any => "///***never_trigger***///";

spice to => 'http://api-public.guidebox.com/v1.3/json/{{ENV{DDG_SPICE_GUIDEBOX_APIKEY}}}/$1/watch/all/20';

handle remainder => sub {

    # TODO
    # Detect if iOS/Android and change api call
    # ie. /best_available/ios/ or /best_available/android/
    return  $_ if $_;
    return;
};

1;
