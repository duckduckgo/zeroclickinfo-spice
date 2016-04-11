package DDG::Spice::SunRiseSet;

use DDG::Spice;
use YAML::XS 'LoadFile';
use Text::Trim;

spice to => 'http://api.xmltime.com/timeservice?accesskey={{ENV{DDG_SPICE_TIME_AND_DATE_ACCESSKEY}}}&secretkey={{ENV{DDG_SPICE_TIME_AND_DATE_SECRETKEY}}}&out=js&query=$1&time=1&tz=1&verbosetime=1&sun=1&version=1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "12h";

triggers startend => "sunset", "sunrise";
triggers start => 
    "when is the sunrise",
    "when is the sunset",
    "when is sunrise",
    "when is sunset",    
    "when does the sun rise",
    "when does the sun set",
    "when does sun rise",
    "when does sun set",
    "when will the sun rise",
    "when will the sun set",
    "when will sun rise",
    "when will sun set";

my $capitals = LoadFile(share('capitals.yml'));

handle remainder_lc => sub {
    my $q = $_;

    $q =~ s/\b(what|is|today|time|in|at)+\b//g;
    $q =~ s/(\,\s)+/ /g;
    $q = trim $q;
    
    return unless $q;
    
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
