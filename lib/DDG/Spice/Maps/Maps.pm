package DDG::Spice::Maps::Maps;
# ABSTRACT: Map of current location

use strict;
use Text::Trim;
use DDG::Spice;
use Data::Dumper;

spice to => 'https://duckduckgo.com/local.js?q=$1&ha=1';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";

my $skip_words_qr = qr/google|yahoo|bing|mapquest|fallout|time zone|editor|world|star|search|tube/i;

my @all_triggers = ('directions');

# allows us to handle e.g.
# - "directions to florida" (matches "florida")
# - "driving directions to 10 canal street new york" (matches "10 canal street new york")
# - "directions from leeds to skipton uk" (matches "skipton uk")
my $directions_qr = qr/^(\w+\s)?directions.*\bto\b/;

triggers any => @all_triggers;

handle query_lc => sub {
    my $query_lc = $_;
    return if $query_lc =~ $skip_words_qr;

    # directions queries
    if ($query_lc =~ $directions_qr) {
        $query_lc =~ s/$directions_qr//g;
        $query_lc = trim ($query_lc);

        # there's a lot of queries like "directions from one place to another"
        return if $query_lc eq "another";

        return $query_lc if $query_lc;
    }

    return;
};

1;
