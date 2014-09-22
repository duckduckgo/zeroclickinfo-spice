package DDG::Spice::Shorten;
# ABSTRACT: Return a shortened version of a URL.

use DDG::Spice;

primary_example_queries "shorten http://www.duckduckgo.com/about.html";
secondary_example_queries "url shorten www.github.com/explore";
description "Shorten URLs using the is.gd API";
name "Shorten";
icon_url "/i/is.gd.ico";
source "Shorten";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Shorten.pm";
topics "social";
category "computing_tools";
attribution github => ['https://github.com/danjarvis','Dan Jarvis'],
            twitter => ['http://twitter.com/danjarvis','danjarvis'];

spice from => '([^/]+)/(.*)';
spice to => 'http://is.gd/create.php?format=json&url=$1%3A%2F%2F$2&callback={{callback}}';
triggers any => 'shorten', 'shorten url', 'short url', 'url shorten';

my %connector_words = map { $_ => 1 } qw(for of);

handle remainder => sub {
    my @query_words =  grep { !$connector_words{$_} } split /\s+/;
    my $q           = shift @query_words;
    return if (@query_words);    # We should only work for a single 'word' in the query.
    $q =~ m|(?<schema>https?)?(?:://)?(?<loc>.+)|;
    my ($schema, $location) = ($+{'schema'}, $+{'loc'});
    return unless defined $location && $location =~ /\./;    # Location part should contain at least one dot.
    return ($schema || 'http'), $location;
};

1;
