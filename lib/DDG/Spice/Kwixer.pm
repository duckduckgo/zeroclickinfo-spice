package DDG::Spice::Kwixer;
# ABSTRACT: Movie search

use strict;
use DDG::Spice;

spice to => 'https://www.kwixer.com/api/search?filter=movie&take=40&source=ddg&lang=en&query=$1';
spice wrap_jsonp_callback => 1;

my @triggers = share("triggers.txt")->slurp;
triggers start => @triggers;
#triggers end => ('actor','actress', 'director');
handle query => sub {
    return $_ if $_;
    return;
};

1;


