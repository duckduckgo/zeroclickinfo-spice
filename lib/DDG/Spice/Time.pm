package DDG::Spice::Time;
# ABSTRACT: Time zone converter

use strict;
use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

spice proxy_cache_valid => "418 1d";
spice to => 'http://api.xmltime.com/timeservice?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&out=js&callback={{callback}}&query=$1&time=1&tz=1&verbosetime=1&version=1';

triggers any => "time", "date", "day", "year", "month";

my $capitals = LoadFile(share('capitals.yml'));

handle query_lc => sub {
    my $q = shift;

    return unless $q =~ m/^(?<rest>what'?s?|is|the|current|local|\s)*(?:time|date|day|month|year|\s)*(?:is|it|in|of|for|at|\s)*(?<loc>[^\?]*)[\?]*$/;
    my $rest = trim $+{rest};
    my $q_loc = trim $+{loc};

    # if no location is given, current user location is returned
    my $tz_string = $loc->time_zone;
    $tz_string =~ s/[\/_]/ /g;
    my $location = join(', ', ($loc->city, $loc->region_name));
    return ($tz_string, 'generic', $location) unless $q_loc;

    $q_loc =~ s/,//g;

    return unless (my $caps = $capitals->{$q_loc});

    # These are internally sorted by population, so assume they want the big one for now.
    $q_loc = string_for_search($caps->[0]);
    return $q_loc;
};

sub string_for_search {
    my $city_hash = shift;

    return join(' ', map { lc $city_hash->{$_} } (qw(city country_name)));
}

1;
