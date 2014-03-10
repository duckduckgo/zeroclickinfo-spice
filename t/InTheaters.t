#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Location;
use DDG::Test::Spice;
use DDG::Request;

my $loc  = test_location("de");
my $code = $loc->country_code;
my $req  = DDG::Request->new( 
    query_raw => "currently in theaters", 
    location => $loc 
);

ddg_spice_test(
    ["DDG::Spice::InTheaters"],
    $req,
    test_spice(
        "/js/spice/in_theaters/in_theaters/$code",
        caller => "DDG::Spice::InTheaters",
        is_cached => 0,
    ),
    'movies' => test_spice(
        "/js/spice/in_theaters/in_theaters/US",
        caller    => 'DDG::Spice::InTheaters',
        is_cached => 0,
    ),
    'movies in theaters' => test_spice(
        "/js/spice/in_theaters/in_theaters/US",
        caller    => 'DDG::Spice::InTheaters',
        is_cached => 0,
    ),
    'currently in theaters' => test_spice(
        "/js/spice/in_theaters/in_theaters/US",
        caller    => 'DDG::Spice::InTheaters',
        is_cached => 0,
    ),
    'i want to watch a movie' => test_spice(
        "/js/spice/in_theaters/in_theaters/US",
        caller    => 'DDG::Spice::InTheaters',
        is_cached => 0,
    ),
);

done_testing;
