package DDG::Spice::Time;
# ABSTRACT: Shows the current time for cities, states and countries

use strict;
use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

primary_example_queries "time in Melbourne", "time for Australia";
secondary_example_queries "what time is it in Melbourne", "what is the time in Birmingham";
description "Provides the local time of country, city or state searched";
name "Time";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Time.pm";
icon_url "/i/timeanddate.com.ico";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/MrChrisW', 'Chris Wilson'];

spice proxy_cache_valid => "418 1d";
spice to => 'http://api.xmltime.com/timeservice?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&out=js&callback={{callback}}&query=$1&time=1&tz=1&verbosetime=1';

triggers any => ["time", "uhr", "zeit", "uhrzeit", "spät"];

my $capitals = LoadFile(share('capitals.yml'));

handle query_lc => sub {
    my $q = shift;

    return unless $q =~ m{
        ^(?:
            (?:was|ist|die|aktuelle|wieviel|welche|wie|\s)*(?:spät|uhrzeit|uhr|zeit)(?:hat|ist|es|in|auf|hier|jetzt|gerade|aktuell|momentan|\s)*  # german
          | (?:what'?s?|is|the|current|local|\s)*time(?:is|it|in|of|for|at|\s)*  # english
        )(?<loc>[^\?]*)[\?]*$
    }x;
    
    my $q_loc = trim $+{loc};

    # if no location is given, current user location is returned
    return join ' ', (lc $loc->city, lc $loc->country_name) unless $q_loc;

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
