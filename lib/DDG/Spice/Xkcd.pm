package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

spice to => 'http://dynamic.xkcd.com/api-0/jsonp/comic/$1';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    if ($_ eq 'xkcd' || $_ =~ /^xkcd (\d+)$/) {
        if ($1) {
            return $1;
        } else {
            return '';
        }
    }
    return;
};

1;
