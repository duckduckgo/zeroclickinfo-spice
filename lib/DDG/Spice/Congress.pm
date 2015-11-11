package DDG::Spice::Congress;
# ABSTRACT: Return current Congress members for given state.

use strict;
use DDG::Spice;

spice to => 'http://congress.api.sunlightfoundation.com/legislators?apikey={{ENV{DDG_SPICE_CONGRESS_APIKEY}}}&chamber=$1&state=$2&per_page=all';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';

spice wrap_jsonp_callback => 1;

triggers startend => 'senate', 'senators', 'senator', 'representatives', 'reps', 'house', 'representative';
sub rtrim($);

handle query_lc => sub {

    my (%states) = (
        'alabama' => 'al',
        'al' => 'al',
        'alaska' => 'ak',
        'ak' => 'ak',
        'arizona' => 'az',
        'az' => 'az',
        'arkansas' => 'ar',
        'ar' => 'ar',
        'california' => 'ca',
        'ca' => 'ca',
        'colorado' => 'co',
        'co' => 'co',
        'connecticut' => 'ct',
        'ct' => 'ct',
        'delaware' => 'de',
        'de' => 'de',
        'florida' => 'fl',
        'fl' => 'fl',
        'georgia' => 'ga',
        'ga' => 'ga',
        'hawaii' => 'hi',
        'hi' => 'hi',
        'idaho' => 'id',
        'id' => 'id',
        'illinois' => 'il',
        'il' => 'il',
        'indiana' => 'in',
        'in' => 'in',
        'iowa' => 'ia',
        'ia' => 'ia',
        'kansas' => 'ks',
        'ks' => 'ks',
        'kentucky' => 'ky',
        'ky' => 'ky',
        'louisiana' => 'la',
        'la' => 'la',
        'maine' => 'me',
        'me' => 'me',
        'maryland' => 'md',
        'md' => 'md',
        'massachusetts' => 'ma',
        'ma' => 'ma',
        'michigan' => 'mi',
        'mi' => 'mi',
        'minnesota' => 'mn',
        'mn' => 'mn',
        'mississippi' => 'ms',
        'ms' => 'ms',
        'missouri' => 'mo',
        'mo' => 'mo',
        'montana' => 'mt',
        'mt' => 'mt',
        'nebraska' => 'ne',
        'ne' => 'ne',
        'nevada' => 'nv',
        'nv' => 'nv',
        'new hampshire' => 'nh',
        'nh' => 'nh',
        'new jersey' => 'nj',
        'nj' => 'nj',
        'new mexico' => 'nm',
        'nm' => 'nm',
        'new york' => 'ny',
        'ny' => 'ny',
        'north carolina' => 'nc',
        'nc' => 'nc',
        'north dakota' => 'nd',
        'nd' => 'nd',
        'ohio' => 'oh',
        'oh' => 'oh',
        'oklahoma' => 'ok',
        'ok' => 'ok',
        'oregon' => 'or',
        'or' => 'or',
        'pennsylvania' => 'pa',
        'pa' => 'pa',
        'rhode island' => 'ri',
        'ri' => 'ri',
        'south carolina' => 'sc',
        'sc' => 'sc',
        'south dakota' => 'sd',
        'sd' => 'sd',
        'tennessee' => 'tn',
        'tn' => 'tn',
        'texas' => 'tx',
        'tx' => 'tx',
        'utah' => 'ut',
        'ut' => 'ut',
        'vermont' => 'vt',
        'vt' => 'vt',
        'virginia' => 'va',
        'va' => 'va',
        'washington' => 'wa',
        'wa' => 'wa',
        'west virginia' => 'wv',
        'wv' => 'wv',
        'wisconsin' => 'wi',
        'wi' => 'wi',
        'wyoming' => 'wy',
        'wy' => 'wy'
    );

    # Matches against special variable `$_`, which contains query
    my ($state1, $chamber, $state2) = /^(.*)(?:\s)*(senate|senators|senator|representatives|representative|reps|house)(?:\s)*(.*)$/g;

    my ($state);

    # Regex returns a space after $1, so we must remove it before hashing
    $state1 = rtrim($state1);

    if (exists $states{$state1}) {
        $state = $states{$state1};
    } elsif (exists $states{$state2}) {
        $state = $states{$state2};
    } else {
        return;
    }

    my (%chambers) = (
        "senators" => "senate",
        "senate" => "senate",
        "senator" => "senate",
        "reps" => "house",
        "representatives" => "house",
        "representative" => "house",
        "house" => "house"
    );

    $chamber = $chambers{$chamber};
    # state needs to be uppercase for Sunlight API
    return $chamber, uc $state if ($chamber && $state);
    return;
};

1;

sub rtrim($) {
    # Removes trailing whitespace
    my $string = shift;
    $string =~ s/\s+$//;
    return $string;
}
