package DDG::Spice::GameInfo;

use DDG::Spice;
primary_example_queries "homesick game";
description "See information about a game";
name "GameInfo";
icon_url "/i/www.giantbomb.ico";
source "GiantBomb";
topics "gaming";
category "reference";
attribution github => ['https://github.com/tophattedcoder','tophattedcoder'];
triggers startend => "game","games";
spice to => 'http://www.giantbomb.com/api/search/?field_list=name,image,site_detail_url,original_game_rating,platforms,deck,original_release_date&api_key={{ENV{DDG_SPICE_GIANTBOMB_APIKEY}}}&format=json&query=$1&callback={{callback}}&resources=game';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};


1;
