package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


triggers any => "///***never_trigger***///";

spice to => 'http://api-public.guidebox.com/v1.3/json/tQudk9zw2SJyooZGV8cO85LfysYklk/$1/watch/free/10';


spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return  $_ if $_;
    return;
};

1;
