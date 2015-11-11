package DDG::Spice::Xkcd::Display;
# ABSTRACT: Displays an xkcd comic

use strict;
use DDG::Spice;

triggers startend => "xkcd";

spice to => 'http://xkcd.com/$1/info.0.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {

    if ($_ =~ /^(\d+|r(?:andom)?)$/) {
        return int rand 1122 if $1 =~ /r/;
        return $1;
    }

    return '' if $_ eq '';
    return;
};

1;
