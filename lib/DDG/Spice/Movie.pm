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
           twitter => ['https://twitter.com/zmoolla','zmoolla'],
            github => ['https://github.com/ehsan','ehsan'];

spice proxy_cache_valid => "200 7d";
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey={{ENV{DDG_SPICE_ROTTEN_APIKEY}}}&q=$1&page_limit=50&page=1&callback={{callback}}';

# It's important that 'movie info' precede 'movie' so that the handler
# encounters it first and removes both words, rather than encountering 'movie'
# first in the list, removing it, and leaving the word 'info.'
my @phrases_to_remove = ( 'movie info', 'movie', 'movies', 'film', 'rotten tomatoes', 'rotten', 
			  'rating', 'ratings', 'release date', 'runtime', 'run time',
			  'running time', 'cast of', 'cast', 'casting', 'actors in',
			  'actor in', 'actors', 'actor', 'actress in', 'actress' );

# need a trigger here to prevent duckpan complaints
triggers query_raw => qr/DUMMY_TRIGGER_SO_DUCKPAN_DOES_NOT_COMPLAIN/;

# remove phrases that usually aren't part of the movie's title.
# these phrases often appear in deep triggers.
handle sub {
    return remove_phrases($_, \@phrases_to_remove);
};

# Remove all instances of an array of phrases from a string.
# Each phrase must appear at word boundaries to be removed.
sub remove_phrases {
    my ($str, $phrases) = @_;
    return $str if !$str;   # if falsy, return the string unchanged

    # remove each phrase (case insensitive)
    foreach my $phrase (@$phrases) {
	$str =~ s/\b\Q$phrase\E\b//gi;
    }

    return $str;
}

1;
