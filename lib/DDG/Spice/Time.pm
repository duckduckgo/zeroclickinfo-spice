package DDG::Spice::Time;
use DDG::Spice;

use YAML::XS qw( Load );

primary_example_queries "time Melbourne", "time Australia", "time birmingham";
secondary_example_queries "what time is it in Melbourne", "what is the time in Birmingham";
description "Provides the local time of country, city or state searched";
name "Time";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Time.pm";
icon_url "/i/timeanddate.com.ico";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];

spice proxy_cache_valid => "418 1d";
spice to => 'http://api.xmltime.com/timeservice?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&out=js&prettyprint=1&callback={{callback}}&query=$1&time=1&tz=1&verbosetime=1';

triggers any => "time", "what time is it in", "time in";

my $capitals = Load(scalar share("capitals.yml")->slurp);

handle remainder_lc => sub {
    my $q = shift;
    $q =~ s/,//g;
    return unless $q;

    if (my $caps = $capitals->{$q}) {
        # These are internally sorted by population, so assume they want the big one for now.
        $q = string_for_search($caps->[0]);
    }

    return $q;
};

sub string_for_search {
    my $city_hash = shift;

    return join(' ', map { lc $city_hash->{$_} } (qw(city country_name)));
}

1;
