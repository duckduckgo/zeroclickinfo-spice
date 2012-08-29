package DDG::Spice::Movie;

use DDG::Spice;

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&q=$1&page_limit=50&page=1&callback={{callback}}';

triggers startend => "movie", "film", "rt", "rotten tomatoes", "rating", "ratings", "rotten";

handle remainder => sub {
    return $_;
};

1;
