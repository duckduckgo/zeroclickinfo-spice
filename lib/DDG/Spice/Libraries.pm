package DDG::Spice::Libraries;
# ABSTRACT: Search for code on libraries.io

use strict;
use DDG::Spice;

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

my $words = join "|", @triggers;
$words =~ s/\n//g;

spice to => 'https://libraries.io/api/search?q=$1&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_raw => sub {
    if (m/$words/i){
        my $query = $_;
        s/$words//ig;
        return $query if length $_ > 1;
    }
    return;
};

1;
