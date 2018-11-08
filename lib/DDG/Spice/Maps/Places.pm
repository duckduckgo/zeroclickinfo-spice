package DDG::Spice::Maps::Places;
# ABSTRACT: Nearby museums, restaurants, ...

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/local.js?q=$1&cb={{callback}}';

# no caching.
spice proxy_cache_valid => "418 1d";
spice is_cached => 0;

my $categories_re = share('categories_re')->slurp;
my $places_re = qr/(local|near|near me|around|around me|here|locally|nearby|close|closest|nearest|locations?|restaurants?)/;
triggers query_lc => qr/(^$places_re\b|\b$places_re$|^$categories_re\b)/s;

my %skip_remainders = map {$_ => 0} ('current', 'time');

handle query_lc => sub {
    my $query = $_;
    foreach my $qw (split(/\s/, $query)) {
        return if exists($skip_remainders{$qw});
    }
    return $query if $query;
};

1;
