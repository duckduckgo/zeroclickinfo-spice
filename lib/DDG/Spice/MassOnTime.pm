package DDG::Spice::MassOnTime;
# ABSTRACT: Get times for masses for cities

use strict;
use DDG::Spice;

triggers any => "catholic";

spice is_cached => 1;
spice from => '([^/]*)/([^/]*)';
spice to => 'http://massontime.com/nearest/$1/10/json?address=$2&api-key={{ENV{DDG_SPICE_MASSONTIME_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    my $event_type;
    my $address;
    if ($_ =~ /^catholic\s(church|parish|mass|confession|adoration|service)(s|es)?(\s+close\sby|\s+around|\s+in|\s+nearby|\s+near|\s+at)?\s*(.*)$/i) {
        $event_type = $1;
        $address = $4;
    } elsif ($_ =~ /^(.*)\s+catholic\s+(church|parish|mass|confession|adoration|service)(s|es)?$/i) {
        $event_type = $2;
        $address = $1;
    }
    else {
        return;
    }

    #MassOnTime API doesn't recognize 'church;, replace with 'parish'
    $event_type = "parish" if $event_type eq "church";

    #Handle blank addresses or 'me' using DDG location api
    if ($address =~ m/^(close|me|here|nearby)$/i or $address eq "" or not defined $address) {
        $address = lc(join(", ", $loc->city, $loc->region_name, $loc->country_name));

        return $event_type, $address, 'current', {is_cached => 0};
    }

    return $event_type, $address;
};

1;
