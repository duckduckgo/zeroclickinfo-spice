package DDG::Spice::Libraries;
# ABSTRACT: Search for code on libraries.io

use strict;
use DDG::Spice;

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

my $words = join "|", @triggers;
$words =~ s/\n//g;

spice from => '(.+)/(.+)';
spice to => 'https://libraries.io/api/search?platforms=$1&q=$2&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder_lc => sub {
    return unless $_;
    return $req->matched_trigger, $_;
};

1;
