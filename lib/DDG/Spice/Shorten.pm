package DDG::Spice::Shorten;
# ABSTRACT: Return a shortened version of a URL.

use strict;
use DDG::Spice;

spice from => '([^/]+)/(.*)';
spice to => 'https://is.gd/create.php?format=json&url=$1%3A%2F%2F$2&callback={{callback}}';
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
