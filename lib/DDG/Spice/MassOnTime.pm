package DDG::Spice::MassOnTime;

use DDG::Spice;

primary_example_queries "Catholic masses near Pittsburg";
description "Search for Catholic Religious Events";
name "MassOnTime";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MassOnTime.pm";
icon_url "http://massontime.com/favicon.ico";
topics "special_interest"
category "reference";
attribution github => ['https://github.com/astine','astine'];

triggers start => "catholic";

spice to => "http://massontime.com/nearest/$1";
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_ =~ /^(church|parish|mass|confession|adoration)(s|es)?\s?(in|near|nearby|at)?\s*(.*)$/i;
    $event_type = $1;
    $address = $4;
    return "$1/5/json?address=$4";
};

1;
