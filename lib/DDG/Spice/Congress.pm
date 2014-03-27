package DDG::Spice::Congress;
# ABSTRACT: Return current Congress members for given state.

use DDG::Spice;
use URI::Escape;

primary_example_queries "new york senators";
secondary_example_queries "florida representatives", "house california";
description "Shows congress by state";
name "Congress";
icon_url "/i/topics.nytimes.com.ico";
source "Sunlight Foundation";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Congress.pm";
topics "special_interest", "trivia";
category "facts";
attribution web =>   ['http://kevinschaul.com','Kevin Schaul','http://www.transistor.io', 'Jason Dorweiler'],
            email => ['kevin.schaul@gmail.com','Kevin Schaul','jason@transistor.io', 'Jason Dorweiler'];


spice to =>'https://congress.api.sunlightfoundation.com/legislators/$1?chamber=$2&state=$3&$4=$5&$6=$7&per_page=all&apikey=c1d1d84619704ae9b8e001d9505bf1a6';

spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)|)|)|)|)|)';

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

    my (%chambers) = (
        "senators" => "senate",
        "senate" => "senate",
        "senator" => "senate",
        "reps" => "house",
        "representatives" => "house",
        "representative" => "house",
        "house" => "house"
    );

    # Matches against special variable `$_`, which contains query
    my ($state1, $chamber, $state2) = /^(.*)(?:\s)*(senate|senators|senator|representatives|representative|reps|house)(?:\s)*(.*)$/g;
    
    $chamber = $chambers{$chamber};

    # We are building the URL for the GET request.  The DDG::Spice
    # package encodes special chars to their equivalent hex number.  
    # This breaks the api with some exceptions, a '/' can
    # be used as a place holder for 'locate' and a blank space for all 
    # others. 
    # the template for the return statement can look something like this
    # return location, chamber, state (upper), "zip", $zip, "lat", latitude, "lon", longitude

    # There are 3 return cases:

    # case 1. If we don't have anything in the state variables
    # : locate by latitude longitude no other terms are needed
    if($chamber && !$state1 && !$state2){
        return 'locate', ' ', ' ', 'latitude', $loc->latitude, 'longitude', $loc->longitude ;
    }

    my ($state);
    my ($zip); 

    # Regex returns a space after $1, so we must remove it before hashing
    $state1 = rtrim($state1);

    #trim off "from" for search terms "from state"
    $state1 =~ s/from\s//;
    $state2 =~ s/from\s//;

    if (exists $states{$state1}) {
        $state = $states{$state1};
    } elsif (exists $states{$state2}) {
        $state = $states{$state2};
    }
    # check to see if we got something that looks like a zip 
    else{
        $zip = $state1;
        if($zip = m/(\W|^)\d{5}(\W|^)/){
            $zip = $state1;
        }
        else{
            $zip = $state2;
            if($zip = m/(\W|\s)\d{5}(\W|$)/){
                $zip = $state2;
            }
        }
    }
 
    # check to see if we only got the search term "house"
    # this IA probably isn't relevant in this case so return
    if($chamber eq "house" && !$state && !$zip){
        return;
    }
    
    # Case 2. If we have a state: provide the chamber and state
    # state needs to be uppercase for Sunlight API
    if($chamber && $state){
        return '/', $chamber, uc $state, ' ', ' ', ' ', ' ', ' ' ;
    }

    # Case 3. If there is a zip code no other terms are needed
    if($zip){
        return 'locate', ' ', ' ', 'zip', $zip, ' ', ' ', ' ';
    }

    return;
};

1;

sub rtrim($) {
    # Removes trailing whitespace
    my $string = shift;
    $string =~ s/\s+$//;
    return $string;
}