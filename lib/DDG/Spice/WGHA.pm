package DDG::Spice::WGHA;
# ABSTRACT: Search for events on was geht heute ab.de.

use strict;
use DDG::Spice;
use utf8;

primary_example_queries "was geht in frankfurt";
secondary_example_queries "wasgeht in berlin";
description "Events in Germany";
name "WGHA Events";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WGHA.pm";
topics "entertainment", "special_interest";
category  "entertainment";
attribution web =>   ['http://www.wasgehtheuteab.de','Samuel Goebert'],
            email => ['http://www.wasgehtheuteab.de','Samuel Goebert'];

my @triggers = ("was geht", "wasgeht", "aus gehen", "ausgehen", "nachtleben", "party", "parties", "partys", "feiern", "abfeiern", "weg gehen","weggehen", "tanz", "tanzen", "veranstaltung", "veranstaltungen", "fest" );

triggers any => @triggers;

spice to => 'http://ddg.wasgehtheuteab.de/duckduckgo/events.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHA_APIKEY}}}';
spice proxy_cache_valid => "200 5m";

handle query_lc => sub {
  $a = $_ . ' ' . $loc->city;
  if ($a =~ /aschaffenburg|augsburg|berlin|berlin-biesdorf|berlin-friedrichshain|berlin-karow|berlin-köpenick|berlin-lichtenberg|berlin-marzahn|berlin-mitte|berlin-oberschöneweide|berlin-pankow|berlin-treptow|bremen|cologne|darmstadt|dieburg|dortmund|dreieich|dresden|dresden-altstadt|dresden-neustadt|düsseldorf|essen|ffm|frankfurt|frankfurt am main|freiburg|freiburg im breisgau|friedrichshain|griesheim|halle|hamburg|hamburg-eimsbüttel|hamburg-mitte|hannover|hanover|heidelberg|kassel|koeln|germany|kreuzberg|köln|leipzig|leipzig-connewitz|leipzig-leutzsch|leipzig-plagwitz|leipzig-stötteritz|mainz|mannheim|munich|mühlheim|münchen|münchen|germany|münster|neu isenburg|nuremberg|nürnberg|offenbach|prenzlauer berg|sankt pauli|sersheim|stuttgart|wiesbaden/) {
    return $a;
  }
  return;
};

1;
