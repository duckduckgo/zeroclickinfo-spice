package DDG::Spice::Libraries;
# ABSTRACT: Search for code on libraries.io

use strict;
use DDG::Spice;

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

my $words = join "|", @triggers;
$words =~ s/\n//g;

spice to => 'https://libraries.io/api/search?q=$1';
spice is_cached => 1;
spice proxy_cache_valid => "200 7d";

handle query_raw => sub {
        return if exists $skip_queries{lc($_)};

    # make sure there is more to the
    # query besides the trigger itself
    if (m/$words/i){
        my $query = $_;
        s/$words//ig;
        return $query if length $_ > 1;
    }
    return;
};

1;
