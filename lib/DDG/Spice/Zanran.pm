package DDG::Spice::Zanran;
# ABSTRACT: Search for stastistical data

use strict;
use DDG::Spice;

spice to => 'http://www.zanran.com/search/simple_json?callback={{callback}}&q=$1';

my @triggers = share('triggers.txt')->slurp;

triggers any => @triggers;

handle query_lc => sub {
  return $_ if $_;
};

1;
