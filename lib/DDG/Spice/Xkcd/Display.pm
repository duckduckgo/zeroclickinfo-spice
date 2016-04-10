package DDG::Spice::Xkcd::Display;
# ABSTRACT: Displays an xkcd comic

use strict;
use DDG::Spice;

triggers startend => "xkcd";

spice to => 'http://xkcd.com/$1/info.0.json';
spice proxy_cache_valid => '200 1h';
spice wrap_jsonp_callback => 1;

spice alt_to => {
	latest => {
        	to => 'http://xkcd.com/info.0.json',
        	proxy_cache_valid => '200 1h'
	}
};

handle remainder => sub {

    if ($_ =~ /^(\d+|r(?:andom)?)$/) {
        return int rand 1122 if $1 =~ /r/;
        return $1;
    }

    return '' if $_ eq '';
    return;
};

1;
