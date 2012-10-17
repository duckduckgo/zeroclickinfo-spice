package DDG::Spice::Xkcd;

use DDG::Spice;

triggers startend => "xkcd";

spice to => 'http://dynamic.xkcd.com/api-0/jsonp/comic/$1';
spice wrap_jsonp_callback => 1;

spice is_cached => 0;

handle query_lc => sub {
    s/ ?xkcd ?//;
    if ($_ =~ /^(\d+|r(?:andom)?)$/) {
        return int rand 1122 if $1 =~ /r/;
        return $1;
    }
    return '' if $_ eq '';
    return;
};

1;
