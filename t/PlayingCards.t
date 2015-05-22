#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::PlayingCards )],

    'deal 9' => test_spice(
        '/js/spice/playing_cards/9',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),

    'deal 10 cards' => test_spice(
        '/js/spice/playing_cards/10',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),
    
    'deal 42' => test_spice(
        '/js/spice/playing_cards/42',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),
    
    'cheap deal' => undef,
    'deal or no deal' => undef,
    'deal' => undef
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;