package DDG::Spice::Congress;
# ABSTRACT: Return current Congress members for given state.

use DDG::Spice;

attribution web => ['http://kevinschaul.com','Kevin Schaul'],
            email => ['kevin.schaul@gmail.com','Kevin Schaul'];

spice to => 'http://api.nytimes.com/svc/politics/v3/us/legislative/congress/112/$1/members.json?state=$2&api-key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

spice wrap_jsonp_callback => 1;

triggers query_lc => qr/^(senators|senate|representatives|reps|house)\s+([a-z][a-z])$/;

handle matches => sub {
    my ($rawChamber) = $_[0];
    my ($state) = $_[1];
    my (%chambers) = (
        "senators" => "senate",
        "senate" => "senate",
        "reps" => "house",
        "representatives" => "house",
        "house" => "house"
    );
    my ($chamber) = $chambers{$rawChamber};
    return $chamber, $state if ($chamber && $state);
    return;
};

1;

