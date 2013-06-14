package DDG::Spice::Guidebox::Lastshows;

use DDG::Spice;


triggers any => "///***never_trigger***///";

spice to => 'http://api-public.guidebox.com/v1.3/json/rKu5Jv4vtj0T0qOQAhSYr8sUQWcBNmpS/$1/watch/free/10';


spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return  $_ if $_;
    return;
};

1;
