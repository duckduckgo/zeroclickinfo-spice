package DDG::Spice::WGHA;
# ABSTRACT: Search for events on was geht heute ab.de.

use DDG::Spice;

primary_example_queries "was geht in frankfurt";
secondary_example_queries "was geht in berlin";
description "Events in Germany";
name "WGHA Events";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WGHA.pm";
topics "entertainment", "special_interest";
category  "entertainment";
attribution web => ['http://www.wgha.de','Samuel Goebert'],
            email => ['http://www.wgha.de','Samuel Goebert'];

my @triggers = ( "was geht", "wasgeht", "party", "parties", "partys", "feiern",
  "aus gehen", "ausgehen", "nachtleben", "weg gehen", "weggehen", "tanzen",
  "club", "clubs", "disco", "event", "events", "veranstaltung" );

triggers any => @triggers;

spice to => 'http://api.wasgehtheuteab.de/duckduckgo/events.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHA_APIKEY}}}';
spice proxy_cache_valid => "200 1h";

handle query_lc => sub {
  return $_;
};

1;
