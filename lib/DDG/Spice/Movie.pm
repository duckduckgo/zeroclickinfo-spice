package DDG::Spice::Movie;

use DDG::Spice;

<<<<<<< HEAD
spice to => 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=ccw2b5ce8dsy7sb3x2qxmn3x&q=$1&page_limit=1&page=1&callback={{callback}}'
=======
sub nginx_conf {
    my $api_key = $ENV{DDG_SPICE_MOVIE_APIKEY}; 
    return unless defined $api_key;
    return <<"__END_OF_CONF__";

location ^~ /js/spice/movie/ {
    rewrite ^/js/spice/movie/(.*) /api/public/v1.0/movies.json?apikey=$api_key&q=\$1&page_limit=1&page=1&callback=ddg_spice_movie break;
    proxy_pass http://api.rottentomatoes.com/;
}

__END_OF_CONF__
}
>>>>>>> upstream/master

triggers startend => "movie";

handle remainder => sub {
    return $_;
};

<<<<<<< HEAD
1;
=======
1;
>>>>>>> upstream/master
