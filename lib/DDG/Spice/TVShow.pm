package DDG::Spice::TVShow;

use DDG::Spice;

primary_example_queries "comedy tv shows";
secondary_example_queries "breaking bad tv show";
description "TV Show information";
name "TV Show";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TVShow.pm";
icon_url "/i/http://www.themoviedb.org.ico";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];

spice to => 'http://api.themoviedb.org/3/search/tv?api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}&query=$1&include_adult=false&callback={{callback}}';

triggers startend => 'tv shows', 'tv show';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;