package DDG::Spice::SunRiseSet;

use DDG::Spice;
use YAML::XS qw( Load );
use Text::Trim;

primary_example_queries "sunset Oslo", "sunrise Oslo";
secondary_example_queries "Oslo sunset time", "Oslo sunrise time";
description "Provides the sunrise/sunset time of country, city or state searched";
name "SunRiseSet";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SunRiseSet.pm";
icon_url "/i/timeanddate.com.ico";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/iambibhas', 'Bibhas'],
            twitter => ['https://twitter.com/bibhasdn', 'Bibhas D'];

spice to => 'http://api.xmltime.com/timeservice?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&out=js&query=$1&time=1&tz=1&verbosetime=1&sun=1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "12h";

triggers startend => "sunset", "sunrise";

my $capitals = Load(scalar share("capitals.yml")->slurp);

handle remainder_lc => sub {
    my $q = $_;

    if ($q ne '') {
        $q =~ s/\b(what|is|today|time|in|at)+\b//g;
        $q =~ s/(\,\s)+/ /g;
        $q = trim $q;
        $q = ($q eq '') ? lc $loc->city : $q;
    } else {
        $q = lc $loc->city;
    }

    if (my $caps = $capitals->{$q}) {
        # These are internally sorted by population,
        # so assume they want the big one for now.
        $q = string_for_search($caps->[0]);
        return $q;
    }
    return;
};

sub string_for_search {
    my $city_hash = shift;
    return join(' ', map { lc $city_hash->{$_} } (qw(city country_name)));
}

1;
