package DDG::Spice::BiblioSearch::GetImageForBook;

use strict;
use DDG::Spice;
use URI::Escape;

triggers any => '///***do not trigger***///';

spice to => 'https://duckduckgo.com/m.js?q=$1';

spice is_cached => 1;
spice proxy_cache_valid => "200 30d";

handle query_lc => sub {
    return $_ if $_;
    return;
};
1;
