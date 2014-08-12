use utf8;
package DDG::Spice::WGHA;

# ABSTRACT: Search for events on was geht heute ab.de.

use DDG::Spice;

primary_example_queries "was geht in frankfurt";
secondary_example_queries "wasgeht in berlin";
description "Events in Germany";
name "WGHA Events";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WGHA.pm";
topics "entertainment", "special_interest";
category  "entertainment";
attribution web =>   ['http://www.wasgehtheuteab.de','Samuel Goebert'],
            email => ['http://www.wasgehtheuteab.de','Samuel Goebert'];

my @triggers = ("was geht", "wasgeht", "aus gehen", "ausgehen", "nachtleben" );

triggers any => @triggers;

spice to => 'http://ddg.wasgehtheuteab.de/duckduckgo/events.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHA_APIKEY}}}';
spice proxy_cache_valid => "200 60m";

handle query_lc => sub {
  return $_ if $loc->country_code eq 'DE';

  if ($_ =~ /berlin|darmstadt|dresden|düsseldorf|duesseldorf|frankfurt|freiburg|hamburg|hannover|kassel|köln|koeln|leipzig|mainz|mannheim|münchen|muenchen|stuttgart/) {
    return $_;
  }
  return;
};

1;
