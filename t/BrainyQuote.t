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

    'quotes breakfast' => test_spice(
        '/js/spice/brainy_quote/breakfast',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),

    # Where is the logic to 'HTMLify' the remainder?
    'quote benjamin franklin' => test_spice(
        '/js/spice/brainy_quote/benjamin%20franklin',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),

    'quotes about work' => test_spice(
        '/js/spice/brainy_quote/about%20work',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),

    'quotes by oscar wilde' => test_spice(
        '/js/spice/brainy_quote/by%20oscar%20wilde',
        call_type => 'include',
        caller => 'DDG::Spice::BrainyQuote',
    ),

    'great quotes about dogs' => undef, 
    'microsoft stock quote' => undef,
    'stock quote duckduckgo' => undef,
    'quote of the day' => undef,
    'quote' => undef
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
