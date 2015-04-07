package DDG::Spice::Rain;

use strict;
use DDG::Spice;

primary_example_queries "is it raining?";
secondary_example_queries "is it raining in New York City?";
description "Check if it's raining";
name "Rain";
source "Forecast.io";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Rain.pm";
topics "everyday";
category "facts";
attribution web => [ 'https://bibhas.in', 'Bibhas Debnath' ],
            github => [ 'https://github.com/iambibhas', 'Bibhas'],
            twitter => ['http://twitter.com/bibhasdn', 'Bibhas D'];

spice to => 'http://beta.json-generator.com/api/json/get/GO60Xk7?callback={{callback}}';

triggers any => "rain", "raining";

spice proxy_cache_valid => '5m';

my %rain = map { $_ => undef } (
    'is it going to rain',
    'going to rain',
    'going to rain today',
    'is it raining',
    'is it raining here',
    'is it raining now',
    'is it going to rain here',
    'is it raining today',
    'is it going to rain today',
    'going to rain today',
    'is it raining yet',
    'make it rain',
    'let it rain'
);

handle query_lc => sub {
    my $query = $_;

    # It's possible that $loc or some of its attributes will be null. If we
    # don't know where the user is, we can't determine the weather there, so we
    # return. This prevents a needless request to isitrainingyet; we already
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

    if (exists $rain{$query}) {
        return $location_str, {is_cached => 0};
    } elsif ($query =~ /^(?:is[ ]it[ ])?
                        (?:going[ ]to[ ])?
                        rain(?:ing)?[ ]?
                        (?:(?:here|now|yet)[ ]?)?
                        (?:in[ ](.*?))?
                        (?:[ ]today)?\??$/ix) {
        return $1 if $1;
        return $location_str, {is_cached => 0};
    }
    return;
};

1;
