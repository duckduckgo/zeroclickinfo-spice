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

spice proxy_cache_valid => '418 1d';

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

    # It's possible that $loc or some of its attributes will be null. If we
    # don't know where the user is, we can't determine the weather there, so we
    # return. This prevents a needless request to isitsnowingyet; we already
    # know that we would get an empty response.
    return unless $loc && ($loc->city || $loc->region_name) && $loc->country_name;

    my @location = ();
    if ($loc->city) {
      push(@location, $loc->city);
    }
    if ($loc->region_name) {
      push(@location, $loc->region_name);
    }
    if ($loc->country_name) {
      push(@location, $loc->country_name);
    }

    my $location_str = join(',', @location);

    if (exists $snow{$query}) {
        return $location_str, {is_cached => 0};
    } elsif ($query =~ /^(?:is[ ]it[ ])?
                        (?:going[ ]to[ ])?
                        snow(?:ing)?[ ]?
                        (?:(?:here|now|yet)[ ]?)?
                        (?:in[ ](.*?))?
                        (?:[ ]today)?\??$/ix) {
        return $1 if $1;
        return $location_str, {is_cached => 0};
    }
    return;
};

1;
