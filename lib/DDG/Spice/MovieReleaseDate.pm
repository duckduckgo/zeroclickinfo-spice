package DDG::Spice::MovieReleaseDate;

use DDG::Spice;

primary_example_queries "release thor the dark world";
secondary_example_queries "thor release date";
description "Movie release information from TheMovieDB";
name "Movie Release Date";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MovieReleaseDate.pm";
icon_url "/i/www.themoviedb.org.ico";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/tophattedcoder','Tom Bebbington'];

spice to => 'http://api.themoviedb.org/3/search/movie?api_key={{ENV{DDG_SPICE_THEMOVIEDB_APIKEY}}}&query=$1&include_adult=false&callback={{callback}}';

triggers any => 'release date', 'release', 'air date', 'air', 'premiere date', 'premiere', 'come out';

handle remainder => sub {
	s/^when //;
	s/(?:^| )(did|does|will)(?: |$)//;
	s/ (for|of)(?= )//;
	s/(?:^| )date(?: |$)//;
    return $_ if $_;
    return;
};
1;
