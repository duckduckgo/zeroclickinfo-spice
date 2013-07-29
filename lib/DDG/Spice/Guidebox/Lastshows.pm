package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;

triggers any => "///***never_trigger***///";

spice to => 'http://api-public.guidebox.com/v1.3/json/{{ENV{DDG_SPICE_GUIDEBOX_APIKEY}}}/$1/watch/best_available/web/20';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    
    # TODO
    # Detect if iOS/Android and change api call
    # ie. /best_available/ios/ or /best_available/android/
    return  $_ if $_;
    return;
};

1;
