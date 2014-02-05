package DDG::Spice::Gifs;

use DDG::Spice;

primary_example_queries "funny cat gifs";
description "Animated Gifs";
name "Gifs";
source "Giphy";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Gifs.pm";
attribution github => ['https://github.com/bsstoner','bsstoner'];

triggers any => "gifs", "gif";

# TODO: this is their beta/trial key, need to contact them if we want to srsly use:
spice to => 'http://api.giphy.com/v1/gifs/search?q=$1&api_key=dc6zaTOxFJmzC';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
	return $_ if $_;
	return;
};

1;
