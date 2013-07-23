package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


triggers any => "///***never_trigger***///";

spice to => 'http://api-public.guidebox.com/v1.3/json/{{ENV{DDG_SPICE_GUIDEBOX_APIKEY}}}/$1/watch/best_available/5';


spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return  $_ if $_;
    return;
};

1;
