package DDG::Spice::GameInfo;

use DDG::Spice;
primary_example_queries "homesick video game";
description "See information about a video game";
name "GameInfo";
icon_url "/i/www.giantbomb.ico";
source "GiantBomb";
topics "gaming";
category "reference";
attribution github => ['https://github.com/tophattedcoder','tophattedcoder'];
triggers startend => "video game","video games","giantbomb";
spice to => 'http://www.giantbomb.com/api/search/?field_list=number_of_user_reviews,name,image,site_detail_url,original_game_rating,platforms,deck,original_release_date,aliases&api_key={{ENV{DDG_SPICE_GIANTBOMB_APIKEY}}}&format=jsonp&query=$1&limit=12&json_callback={{callback}}&resources=game';

handle remainder => sub {
    return $_ if $_;
    return;
};


1;
