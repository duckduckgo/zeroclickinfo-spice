package DDG::Spice::Movie;

use DDG::Spice;

primary_example_queries "the graduate movie";
secondary_example_queries "jiro dreams of sushi rating", "indie game film";
description "Movie information from Rotten Tomatoes";
name "Movie";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Movie.pm";
icon_url "/i/www.rottentomatoes.com.ico";
topics "entertainment";
category "entertainment";
attribution github => ['https://github.com/moollaza','Zaahir Moolla'],
           twitter => ['https://twitter.com/zmoolla','Zaahir Moolla'];
status "enabled";

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&q=$1&page_limit=50&page=1&callback={{callback}}';

triggers startend => "movie", "film", "rt", "rotten tomatoes", "rating", "ratings", "rotten";

handle remainder => sub {
    return $_;
};

1;
