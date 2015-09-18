package DDG::Spice::WGHATickets;
# ABSTRACT: Tickets for events in Germany.

use strict;
use DDG::Spice;
use utf8;

primary_example_queries "Karten für Max Mutzke in Frankfurt";
secondary_example_queries "Abendkasse Sarah";
description "Tickets for events in Germany";
name "WGHA Tickets";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WGHATickets.pm";
topics "entertainment", "special_interest";
category  "entertainment";
attribution web =>   ['http://www.wasgehtheuteab.de','Samuel Goebert'],
            email => ['http://www.wasgehtheuteab.de','Samuel Goebert'];

my @triggers = ("konzert", "konzerte","livekonzert","livekonzerte", "live", "abendkasse", "karte", "karten", "dauerkarte", "dauerkarten", "konzertkarte", "konzertkarten", "eintrittskarte", "eintrittskarten", "eintritt", "aufführung", "theater", "theaterkarte", "theaterkarten","ticket", "tickets", "festivalkarten", "festival");

triggers any => @triggers;

spice to => 'http://ddg.wasgehtheuteab.de/duckduckgo/tickets.json?q=$1&callback={{callback}}&api_key={{ENV{DDG_SPICE_WGHATICKETS_APIKEY}}}';

spice proxy_cache_valid => "200 30m";

handle query_lc => sub {
  # This spice only triggers if request is from the Germany region
  $a = $_ . ' ' . $loc->city;
  return $a if $loc->country_code eq 'DE';
  return;
};

1;
