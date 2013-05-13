package DDG::Spice::Guidebox::Getid;

use DDG::Spice;


triggers startend => "guidebox", "watch", "full episodes", "full episodes of", "watch free", "full free episodes", "full free episodes of", "free episodes", "free episodes of";

spice to => 'http://api-public.guidebox.com/v1.3/json/rKu5Jv4vtj0T0qOQAhSYr8sUQWcBNmpS /search/all/title/$1';

primary_example_queries "guidebox Castle";
description "Search for full episodes of all your favorite TV shows (USA only)";
name "Guidebox";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Lastshows.pm";
icon_url "/i/www.guidebox.com.ico";
topics "everyday", "entertainment", "social";
category "entertainment";
attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];
status "enabled";

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
