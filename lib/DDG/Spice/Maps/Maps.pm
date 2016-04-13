package DDG::Spice::Maps::Maps;
# ABSTRACT: Map of current cocation

use strict;
use Text::Trim;
use DDG::Spice;
use Data::Dumper;

spice to => 'http://api.mapbox.com/v4/geocode/mapbox.places/$1.json?access_token={{ENV{DDG_SPICE_MAPBOX_KEY}}}';
spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

my @startend_triggers = ("map of", "map", "maps", "current location");
my $startend_joined = join "|", @startend_triggers;
my $start_qr = qr/^($startend_joined)/;
my $end_qr = qr/($startend_joined)$/;

my $skip_words_qr = qr/google|yahoo|bing|mapquest|fallout|time zone|editor|world|star|search/i;

my @all_triggers = @startend_triggers;
push @all_triggers, "directions";

# allows us to handle e.g.
# - "directions to florida" (matches "florida")
# - "driving directions to 10 canal street new york" (matches "10 canal street new york")
# - "directions from leeds to skipton uk" (matches "skipton uk")
my $directions_qr = qr/^(\w+\s)?directions.*\bto\b/;

triggers any => @all_triggers;

handle query_lc => sub {
    return if $query_lc =~ $skip_words_qr;

    # handle maps/locations queries
    if ($_ =~ $start_qr or $_ =~ $end_qr) {
        # replace trigger words
        $_ =~ s/$start_qr//g;
        $_ =~ s/$end_qr//g;
        $_ = trim ($_);

        return $_ if $_;

        # if there's no remainder, show the user's location
        my $location = $loc->loc_str;
        return $location if $location;
    }

    # directions queries
    if ($_ =~ $directions_qr) {
        $_ =~ s/$directions_qr//g;
        $_ = trim ($_);

        # there's a lot of queries like "directions from one place to another"
        return if $_ eq "another";

        return $_ if $_;
    }

    return;
};

1;

