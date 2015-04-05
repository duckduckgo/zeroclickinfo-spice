package DDG::Spice::WorldHeritageSites;
# ABSTRACT: Returns a list and map of Unesco World Heritage Sites, given a country or region

use DDG::Spice;

name "World Heritage Sites";
description "List of Unesco World Heritage Sites";
source "http://whc.unesco.org";
icon_url "http://whc.unesco.org/favicon.ico";
primary_example_queries "/r/pizza", "subreddit nature";
category "geography";
topics "geography", "travel", "web_design";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WorldHeritageSites.pm";
attribution github  => ["marianosimone", "Mariano Simone"];

triggers startend => (
    'unesco sites',
    'unesco heritage sites',
    'unesco world heritage',
    'world heritage'
);

spice to => 'http://whc.unesco.org/?cid=31&l=en&search_by_country=$1&mode=json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
