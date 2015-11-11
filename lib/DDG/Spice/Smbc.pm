package DDG::Spice::Smbc;
# ABSTRACT: Gets the Saturday Morning Breakfast Cereal Comic

use strict;
use DDG::Spice;

triggers any => 'smbc', 'saturday morning breakfast cereal';

spice to => 'http://comics.signedzero.com/smbc/feed.json';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    s/(today'?s )?(smbc|saturday morning breakfast cereal)( comic)?//g;
    return '' if $_ eq '';
    return;
};

1;
