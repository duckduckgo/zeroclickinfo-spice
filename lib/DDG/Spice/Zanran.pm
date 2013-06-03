package DDG::Spice::Zanran;

use DDG::Spice;

attribution github => ["https://github.com/taw", "taw"],
	        twitter => ["https://twitter.com/t_a_w", "Tomasz Wegrzanowski"];
primary_example_queries "oil production in saudi arabia", "agriculture contribution to gdp";
secondary_example_queries "construction injuries australia", "global mobile data usage";
category "facts";
topics "economy_and_finance", "special_interest", "trivia";
name "Zanran";
description "Data and Statistics";
icon_url "/i/www.zanran.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zanran.pm";
source "Zanran";
status "enabled";

spice to => 'http://www.zanran.com/search/simple_json?callback={{callback}}&q=$1';

my @triggers = share('triggers.txt')->slurp;

triggers any => @triggers;

handle query_lc => sub {
  return $_ if $_;
};

1;