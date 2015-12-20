package DDG::Spice::WGHA;
# ABSTRACT: Search for events on was geht heute ab.de.

use strict;
use DDG::Spice;
use utf8;

primary_example_queries "was geht in frankfurt";
secondary_example_queries "wasgeht in berlin";
description "Find Party in Germany";
name "WGHA Events";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WGHA.pm";
topics "entertainment", "special_interest";
category  "entertainment";
attribution web =>   ['https://www.wasgehtheuteab.de','Samuel Goebert'],
            email => ['info@wasgehtheuteab.de','Samuel Goebert'];

my @triggers = ("was geht", "wasgeht", "aus gehen", "ausgehen", "nachtleben", "party", "parties", "partys", "feiern", "abfeiern", "weg gehen","weggehen", "tanz", "tanzen", "veranstaltung", "veranstaltungen", "fest" );

triggers any => @triggers;

spice to => 'http://ddg.wasgehtheuteab.de/duckduckgo/events.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHA_APIKEY}}}';
spice proxy_cache_valid => "200 5m";

handle query_lc => sub {
  $a = $_ . ' ' . $loc->city;
  return $a;
};

1;
