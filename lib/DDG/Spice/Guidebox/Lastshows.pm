package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;

spice to => 'http://api-public.guidebox.com/v1.3/json/{{ENV{DDG_SPICE_GUIDEBOX_APIKEY}}}/$1/watch/all/20';

1;
