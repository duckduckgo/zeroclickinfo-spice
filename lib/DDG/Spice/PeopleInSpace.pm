package DDG::Spice::PeopleInSpace;
# ABSTRACT: Returns the number of humans currently in space

use strict;
use DDG::Spice;

triggers any => "people in space", "people are in space", "people who are in space",
    "people in orbit", "people are in orbit", "people who are in orbit",
    "humans in space", "humans are in space", "humans who are in space",
    "humans in orbit", "humans are in orbit", "humans who are in orbit",
    "astronauts in space", "astronauts are in space", "astronauts who are in space",
    "astronauts in orbit", "astronauts are in orbit", "astronauts who are in orbit",
    "cosmonauts in space", "cosmonauts are in space", "cosmonauts who are in space",
    "cosmonauts in orbit", "cosmonauts are in orbit", "cosmonauts who are in orbit",
    "who's in space", "who's in orbit", "who is in space", "who is in orbit", "anyone in space", "anyone in orbit",
    "whose in space", "whose in orbit";

spice to => 'http://www.howmanypeopleareinspacerightnow.com/peopleinspace.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return 1;
};

1;
