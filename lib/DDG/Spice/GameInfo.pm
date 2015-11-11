package DDG::Spice::GameInfo;
# ABSTRACT: Information about video games

use strict;
use DDG::Spice;

triggers startend => "video game","video games","giantbomb";
spice to => 'http://www.giantbomb.com/api/search/?api_key={{ENV{DDG_SPICE_GIANTBOMB_APIKEY}}}&format=jsonp&query=$1&limit=12&json_callback={{callback}}&resources=game&field_list=number_of_user_reviews,name,image,site_detail_url,original_game_rating,platforms,deck,original_release_date,aliases';

handle remainder => sub {
    return $_ if $_;
    return;
};


1;
