package DDG::Spice::GameReleaseDate;

use DDG::Spice;

primary_example_queries "release battlefield 4";
secondary_example_queries "super mario bros release date";
description "Game release information from GameBomb";
name "Game Release Date";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GameReleaseDate.pm";
icon_url "/i/www.giantbomb.com.ico";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];

spice to => 'http://www.giantbomb.com/api/search/?field_list=name,site_detail_url,original_release_date,aliases,number_of_user_reviews&api_key={{ENV{DDG_SPICE_GIANTBOMB_APIKEY}}}&format=jsonp&query=$1&limit=1&json_callback={{callback}}&resources=game';

triggers any => 'release', 'come out';

handle remainder => sub {
	s/^when //;
	s/(?:^| )(did|does|will)(?: |$)//;
	s/(?:^| )(for|of)(?: |$)//;
	s/(?:^| )date(?: |$)//;
    return $_ if $_;
    return;
};

1;
