package DDG::Spice::Rain;

use strict;
use DDG::Spice;

spice to => 'https://darksky.net/ddg?apikey={{ENV{DDG_SPICE_FORECAST_APIKEY}}}&q=$1&callback={{callback}}';

triggers start => "is it raining";
triggers end => "raining here", "raining now", "raining yet";

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
