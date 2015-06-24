#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BrainyQuote )],

    'lincoln quote' => test_spice(
        '/js/spice/brainy_quote/lincoln',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),
    
    'buddha quote' => test_spice(
        '/js/spice/brainy_quote/buddha',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),

    'stock quote' => undef,
    'quote' => undef
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;