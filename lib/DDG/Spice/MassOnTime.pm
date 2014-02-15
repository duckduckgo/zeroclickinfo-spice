package DDG::Spice::MassOnTime;

use DDG::Spice;

primary_example_queries "Catholic masses near Pittsburgh";
description "Search for Catholic Religious Events";
name "MassOnTime";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MassOnTime.pm";
icon_url "http://massontime.com/favicon.ico";
topics "special_interest";
category "reference";
attribution github => ['https://github.com/astine','astine'];

triggers start => "catholic";

spice from => '([^/]*)/([^/]*)';
spice to => 'http://massontime.com/nearest/$1/10/json?address=$2&api-key={{ENV{DDG_SPICE_MASSONTIME_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return unless $_ =~ /^(church|parish|mass|confession|adoration)(s|es)?\s?(in|near|nearby|at)?\s*(.*)$/i;
    my $event_type = $1;
    $event_type = "parish" if $event_type eq "church";
    my $address = $4;
    return $event_type, $address;
};

1;
