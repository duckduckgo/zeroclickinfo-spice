package DDG::Spice::SimilarWeb;

use DDG::Spice;

primary_example_queries "similar sites to facebook.com", "similar to youtube.com";
secondary_example_queries "", "";
description "Search for similar websites";
name "SimilarWeb search";
source "SimilarWeb";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SimilarWeb.pm";
icon_url "/i/www.similarweb.com.ico";
category "entertainment";
topics "everyday", "special_interest";
attribution github => ['https://github.com/Adman', 'Adman'],
            twitter => ['http://twitter.com/adman_X', 'adman_X'];

triggers startend => "similar sites to", "similar web to", "sites like", "websites like", "webs like", "pages like";

spice to => 'http://api.similarweb.com/Site/$1/v2/SimilarSites?Format=JSON&UserKey=95de551d83b0f5cbb658c8d1d669dd3a';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # remove whitespace
    s/^\s+|\s+$//;
    return $_ if $_
};

1;
