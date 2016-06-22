package DDG::Spice::Github;
# ABSTRACT: Search for information about GitHub repositories
use strict;
use DDG::Spice;

spice to => 'https://api.github.com/search/repositories?q=$1&sort=updated&callback={{callback}}';

spice proxy_cache_valid => '200 30d';

triggers start => '///***never trigger***///';

handle remainder => sub {
    return "$_" if $_;
};
1;
