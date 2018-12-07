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

# export SHOW_IA_TESTING=1
my $show_ia = $ENV{SHOW_IA_TESTING} || 0;
handle query_lc => sub {
    return unless $show_ia;
    return $_ if $_;
};
1;
