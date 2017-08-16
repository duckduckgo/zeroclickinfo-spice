package DDG::Spice::WGHA;
# ABSTRACT: Search for events on was geht heute ab.de.

use strict;
use DDG::Spice;
use utf8;

my @triggers = ("was geht", "wasgeht", "aus gehen", "ausgehen", "nachtleben", "parties", "partys", "feiern", "abfeiern", "weg gehen","weggehen", "tanz", "tanzen", "veranstaltung", "veranstaltungen");
my $cities = "Aschaffenburg|Augsburg|Berlin|Berlin-Biesdorf|Berlin-Friedrichshain|Berlin-Karow|Berlin-Köpenick|Berlin-Lichtenberg|Berlin-Marzahn|Berlin-Mitte|Berlin-Oberschöneweide|Berlin-Pankow|Berlin-Treptow|Bremen|Cologne|Darmstadt|Dieburg|Dortmund|Dreieich|Dresden|Dresden-Altstadt|Dresden-Neustadt|Düsseldorf|Essen|FFM|Frankfurt|Frankfurt am Main|Freiburg|Freiburg im Breisgau|Friedrichshain|Griesheim|Halle|Hamburg|Hamburg-Eimsbüttel|Hamburg-Mitte|Hannover|Hanover|Heidelberg|Kassel|Koeln|Germany|Kreuzberg|Köln|Leipzig|Leipzig-Connewitz|Leipzig-Leutzsch|Leipzig-Plagwitz|Leipzig-Stötteritz|Mainz|Mannheim|Munich|Mühlheim|München|München|Germany|Münster|Neu Isenburg|Neukölln|Nuremberg|Nürnberg|Offenbach|Prenzlauer Berg|Sankt Pauli|Schöneberg|Sersheim|Stuttgart|Wiesbaden";

triggers any => @triggers;

spice to => 'http://ddg.wasgehtheuteab.de/duckduckgo/events.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHA_APIKEY}}}';
spice proxy_cache_valid => "200 5m";

handle query_lc => sub {
  return if $loc->country_code ne 'DE';

  my $q = $_ . ' ' . $loc->city; # attach city of query origin to query

  if ($q =~ /$cities/i) {
   return $q;
 }

 return;
};

1;
