#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SkyscannerFlightSearch)],
    # if skyscanner is in the keywords then should trigger
    'Skyscanner' => expected_output('US/en-US/USD/US/anywhere'),
    'skyscanner flights' => expected_output('US/en-US/USD/US/anywhere'),
    'skyscanner deals' => expected_output('US/en-US/USD/US/anywhere'),
    
    # if origin specified then query should use it
    'skyscanner flights from United Kingdom' => expected_output('US/en-US/USD/gb/anywhere'),
     
    # if destination specified then query should use it
    'skyscanner flights to United States' => expected_output('US/en-US/USD/US/us'),

    # if both origin and destination specified then query should use them
    'skyscanner flights from United Kingdom to United States' => expected_output('US/en-US/USD/gb/us'),
    
    # Skyscanner should be case insensitive
    'skYsCannEr' => expected_output('US/en-US/USD/US/anywhere'),
    
    # keywords without 'Skyscanner' should not trigger
    'flights' => undef,
    
    # skyscanner mispelt then should not trigger
    'sky scanner' => undef, 
    
);

# Returns the output we expect to receive from the test
# when the domain spice is triggered properly.
sub expected_output {

# get the parameters we expect for the spice trigger
    my ($search_parameters) = @_;
    return undef if !defined $search_parameters;
    
    # return the output we expect for the spice test
    return test_spice(
        '/js/spice/skyscanner_flight_search/' . $search_parameters,
        call_type => 'include',
        caller => 'DDG::Spice::SkyscannerFlightSearch',
    );

}

done_testing;

