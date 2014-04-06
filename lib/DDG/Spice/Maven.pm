package DDG::Spice::Maven;
# ABSTRACT: Search library in Maven Central Repository.

use DDG::Spice;

attribution github  => ['https://github.com/nicoulaj', 'nicoulaj'],
            twitter => ['http://twitter.com/nicoulaj', 'nicoulaj'];

triggers startend => "maven", "mvn";

name "Maven";
source "Maven Central Repository";
icon_url "http://search.maven.org/favicon.ico";
description "Search packages available on the Maven Central Repository."
primary_example_queries "maven pegasus";
secondary_example_queries "mvn mod4j";

category "software";
topics "computing", "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Maven.pm";

spice to => 'http://search.maven.org/solrsearch/select?q=$1&rows=5&wt=json&callback={{callback}}';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid   => "418 1d";

handle remainder => sub {
    return $_;
};

1;
