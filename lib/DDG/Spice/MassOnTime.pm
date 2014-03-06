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
    return unless $_ =~ /^(church|parish|mass|confession|adoration)(s|es)?(\s+in|\s+nearby|\s+near|\s+at)?\s*(.*)$/i;
    my $event_type = $1;
    my $address = $4;
    
    #MassOnTime API doesn't recognize 'church;, replace with 'parish'
    $event_type = "parish" if $event_type eq "church";

    #Handle blank addresses or 'me' using DDG location api
    $address = join(", ", $loc->city, $loc->region_name, $loc->country_name) 
        if ($address eq "me" or $address eq "" or not defined $address);

    return $event_type, $address;
};

1;
