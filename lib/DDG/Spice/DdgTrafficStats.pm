package DDG::Spice::DdgTrafficStats;

use DDG::Spice;

name "ddg_traffic_stats";
description "See DuckDuckGo searchtraffic stats.";
source "DuckDuckGo";
icon_url "https://duckduckgo.com/assets/ddg-icon-256x160.png";
primary_example_queries "duckduckgo search traffic";
secondary_example_queries "ddg traffic";
# TODO
category "special";
topics "special_interest";
code_url "https://github.com/bradcater/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DdgTrafficStats.pm";
attribution github => ["https://github.com/bradcater", "Brad Cater"],
            twitter => ["https://twitter.com/bradcater", "bradcater"];

triggers query_lc => qr/(ddg|duckduckgo)( search)? (traffic|stats)/;

spice call_type => 'self';

handle query_lc => sub {
  return call;
};

1;
