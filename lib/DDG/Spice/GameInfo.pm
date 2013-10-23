package DDG::Spice::GameInfo;

use DDG::Spice;
primary_example_queries "ocarina of time game";
description "See information about a game";
name "Game Information";
icon_url "/i/giantbomb.com/favicon.ico";
source "www.giantbomb.com";
topics "gaming";
category "reference";
attribution github => ['https://github.com/tophattedcoder','tophattedcoder'];

triggers startend => "game","games";
spice to => 'http://www.giantbomb.com/api/search/?api_key={{ENV{DDG_SPICE_GAMEBOMB_APIKEY}}}&format=json&query=$1&limit=1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};


1;
