package DDG::Spice::Experimentalia;
# ABSTRACT: Search for information about GitHub repositories

use strict;
use DDG::Spice;
use Text::Trim;

triggers query_lc => qr/(.*)/;
spice to => 'https://beta.duckduckgo.com/installed.json';
spice wrap_jsonp_callback => 1;
#spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
handle query_lc => sub {
        return $_ if $_;
};
1;
