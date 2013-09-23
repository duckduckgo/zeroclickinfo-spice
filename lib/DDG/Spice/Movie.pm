package DDG::Spice::Movie;

use DDG::Spice;

primary_example_queries "the graduate movie";
secondary_example_queries "jiro dreams of sushi rating", "indie game film";
description "Movie information from Rotten Tomatoes";
name "Movie";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Movie.pm";
icon_url "/i/www.rottentomatoes.com.ico";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/moollaza','Zaahir Moolla'],
           twitter => ['https://twitter.com/zmoolla','zmoolla'];

spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={{ENV{DDG_SPICE_ROTTEN_APIKEY}}}&q=$1&page_limit=50&page=1&callback={{callback}}';

my @triggers = ( 'movie', 'film', 'rt', 'rotten tomatoes', 'rating', 'ratings', 'rotten' );

triggers startend => @triggers;

handle query_lc => sub {
    # spice triggers are called when a trigger is part of a hyphenated word
    # i.e.: asus rt-66nu
    # this makes sure that only space deliminated words fire this spice
    my $input = $_;
    map { return $input if $input =~ s/(^|\s)$_(\s|$)// and $input ne '' } @triggers;
    return;
};

1;
