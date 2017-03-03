package DDG::Spice::Libraries;
# ABSTRACT: Search for code on libraries.io

use strict;
use DDG::Spice;

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

my $words = join "|", @triggers;
$words =~ s/\n//g;

spice to => 'https://libraries.io/api/search?q=$1&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}';
spice is_cached => 1;
spice proxy_cache_valid => "418 1d";

# handle query_raw => sub {
#     if (m/$words/i){
#         my $query = $_;
#         s/$words//ig;
#         return $query if length $_ > 1;
#     }
#     return;
# };

handle remainder => sub {

    return $_ if $_;
    return;
};

1;
