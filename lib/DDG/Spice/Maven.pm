package DDG::Spice::Maven;
# ABSTRACT: Search library in Maven Central Repository.

use DDG::Spice;

attribution github  => ['https://github.com/nicoulaj', 'nicoulaj'],
            twitter => ['http://twitter.com/nicoulaj', 'nicoulaj'];

triggers startend => "maven", "mvn";

spice to => 'http://search.maven.org/solrsearch/select?q=$1&rows=5&wt=json&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";
spice is_unsafe => 1;

handle remainder => sub {
    return $_;
};

1;
