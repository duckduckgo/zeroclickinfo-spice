package DDG::Spice::Snow;

use DDG::Spice;

primary_example_queries "is it snowing?";
secondary_example_queries "is it snowing in New York City?";
description "Check weather conditions at your location";
name "Snow";
icon_url "/icon16.png";
source "Is it snowing yet?";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Snow.pm";
topics "everyday";
category "facts";
attribution web => [ 'https://www.duckduckgo.com', 'DuckDuckGo' ],
            github => [ 'https://github.com/duckduckgo', 'duckduckgo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

spice to => 'http://isitsnowingyet.org/api/check/$1/key/{{ENV{DDG_SPICE_SNOW_APIKEY}}}';

triggers any => "snow", "snowing";

my %snow = map { $_ => undef } (
    'is it going to snow',
    'going to snow',
    'going to snow today',
    'is it snowing',
    'is it snowing here',
    'is it snowing now',
    'is it going to snow here',
    'is it snowing today',
    'is it going to snow today',
    'going to snow today',
    'is it snowing yet',
    'make it snow',
    'let it snow'
);

handle query_lc => sub {
    my $query = $_;
    my $location = join(" ", $loc->city . ', ', $loc->region_name . ', ', $loc->country_name);

    if(exists $snow{$query}) {
        return $location;
    } elsif($query =~ /^(?:is[ ]it[ ])?
                        (?:going[ ]to[ ])?
                        snow(?:ing)?[ ]?
                        (?:(?:here|now|yet)[ ]?)?
                        (?:in[ ](.*?))?
                        (?:[ ]today)?\??$/ix) {
        $location = $1 || $location;
        return $location;
    }
    return;
};

1;
