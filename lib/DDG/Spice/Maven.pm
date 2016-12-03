package DDG::Spice::Maven;
# ABSTRACT: Search library in Maven Central Repository.

use strict;
use DDG::Spice;

triggers startend => "maven", "mvn","library","repository","repo","package";

spice to => 'http://search.maven.org/solrsearch/select?q=$1&rows=5&wt=json&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
