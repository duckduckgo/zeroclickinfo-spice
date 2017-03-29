package DDG::Spice::Dockerhub;
# ABSTRACT: Search for Docker Hub images

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1h';
spice wrap_jsonp_callback => 1;
spice to => 'https://index.docker.io/v1/search?q=$1';

triggers startend => 'docker', 'dockerhub', 'docker hub';
triggers end => 'docker image';

handle remainder => sub {
    return unless $_;
    return $_;
};

1;
