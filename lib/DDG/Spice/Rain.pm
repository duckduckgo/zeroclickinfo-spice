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

spice to => 'http://forecast.io/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

triggers start => "is it raining", "will it rain";
triggers any => "going to rain";
triggers end => "raining here", "raining now", "raining today", "raining yet";

spice proxy_cache_valid => '5m';

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

    if ($query =~ /^(?:is[ ]it[ ])?
                    (?:going[ ]to[ ])?
                    rain(?:ing)?[ ]?
                    (?:(?:here|now|yet)[ ]?)?
                    (?:in[ ](.+?))?
                    (?:[ ]today)?\??$/ix) {
        return $1 if $1;
        return $location_str, {is_cached => 0};
    }
    return;
};

1;
