package DDG::Spice::Maps::Places;
# ABSTRACT: Nearby museums, restaurants, ...

use strict;
use DDG::Spice;

spice to => 'https://duckduckgo.com/local.js?q=$1&cb={{callback}}';
spice latlon_to => 'https://duckduckgo.com/local.js?q=$1&latlon=$lat,$lon&cb={{callback}}';
# no caching.
spice proxy_cache_valid => "418 1d";
spice is_cached => 0;
spice uses_browser_location => 1;

my $chains_re = share('chains_re')->slurp;
my $places_re = qr/(local|near|near me|around|around me|here|locally|nearby|close|closest|nearest|locations?|restaurants?)/;
triggers query_lc => qr/(^$chains_re$|^$places_re|$places_re$)/s;

my %skip_remainders = map {$_ => 0} ('current', 'time');

handle query_lc => sub {
    my $query = $_;
    foreach my $qw (split(/\s/, $query)) {
        return if exists($skip_remainders{$qw});
    }
    return $query if $query;
};

1;

