package DDG::Spice::Dockerhub;
# ABSTRACT: Search for Docker Hub images

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';
spice wrap_jsonp_callback => 1;
spice to => 'https://index.docker.io/v1/search?q=$1';

triggers startend => [
    'docker', 
    'docker.com', 
    'dockerhub', 
    'docker hub', 
    'docker image', 
    'docker images',
    'docker container',
    'docker containers'
];

handle remainder => sub {
    
    return $_ if $_;
    return \$_;
};

1;
