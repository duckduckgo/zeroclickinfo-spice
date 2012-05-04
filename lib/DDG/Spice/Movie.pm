package DDG::Spice::Movie;

use DDG::Spice;

sub nginx_conf {
    my $api_key = $ENV{DDG_SPICE_MOVIE_APIKEY}; 
    return unless defined $api_key;
    return <<"__END_OF_CONF__";

location ^~ /js/spice/movie/ {
    rewrite ^/js/spice/movie/(?:.+) /api/public/v1.0/movies.json?apikey=$api_key&q=\$1&page_limit=1&page=1&callback=ddg_spice_movie;
    proxy_pass http://api.rottentomatoes.com/;
    proxy_cache_valid 418 1d;
}

__END_OF_CONF__
}

triggers startend => "movie";

handle remainder => sub {
    return $_;
};

1;
