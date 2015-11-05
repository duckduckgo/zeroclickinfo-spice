package DDG::Spice::CodeDay;
# ABSTRACT: Get all CodeDay events, sorted by closest to farthest

use DDG::Spice;

spice is_cached => 1;

name "CodeDay";
source "CodeDay.org";
icon_url "https://codeday.org/assets/img/favicon.ico";
description "Get the CodeDay event nearest to you and find out more about it.";
primary_example_queries "codeday near me", "when is codeday?";
secondary_example_queries "codeday";
category "programming";
topics "programming", "geek", "computing", "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/CodeDay.pm";
attribution github => ["tjhorner", "TJ Horner"],
            twitter => "tjhorner";

spice to => 'https://clear.codeday.org/api/regions/nearby?lat=$1&lng=$2&limit=50';
spice from => "(.+)/(.*)";

spice wrap_jsonp_callback => 1;

triggers any => "codeday", "code day"; # yes, some people spell it like "code day"

handle query => sub {
    # TODO: Maybe add handling for "codeday [city name]" or "[city name] codeday"?
    return $loc->latitude,$loc->longitude;
};

1;
