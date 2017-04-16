#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::Upc'
    ],
    'upc 0111222333446' => test_spice(
        '/js/spice/upc/0111222333446',
        call_type => 'include',
        caller => 'DDG::Spice::Upc',
        is_cached => 1
    ),
    'upc code 0111222333446' => test_spice(
        '/js/spice/upc/0111222333446',
        call_type => 'include',
        caller => 'DDG::Spice::Upc',
        is_cached => 1
    ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
