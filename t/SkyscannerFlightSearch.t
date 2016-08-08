#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SkyscannerFlightSearch)],
    # if skyscanner is in the keywords then should trigger
    'Skyscanner' => expected_output(),
    'skyscanner flights' => expected_output(),
    'skyscanner deals' => expected_output(),
    # Skyscanner should be case insensitive
    'skYsCannEr' => expected_output(),
    # keywords without 'Skyscanner' should not trigger
    'flights' => undef,
    # skyscanner mispelt then should not trigger
    'sky scanner' => undef, 
);

# Returns the output we expect to receive from the test
# when the domain spice is triggered properly.
sub expected_output {
    # return the output we expect for the spice test
    return test_spice(
        '/js/spice/skyscanner_flight_search/US',
        call_type => 'include',
        caller => 'DDG::Spice::SkyscannerFlightSearch',
    );

}

done_testing;

