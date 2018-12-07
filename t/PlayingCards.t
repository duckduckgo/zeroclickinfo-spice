#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::PlayingCards )],

    'deal 10 cards' => test_spice(
        '/js/spice/playing_cards/10',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),
    
    'deal 42 playing cards' => test_spice(
        '/js/spice/playing_cards/42',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),
    
    'draw 10 random cards' => test_spice(
        '/js/spice/playing_cards/10',
        call_type => 'include',
        caller => 'DDG::Spice::PlayingCards',
    ),
    
    'cheap deal' => undef,
    'deal or no deal' => undef,
    'deal' => undef,
    'deal 9' => undef,
    'deal 53 cards' => undef,
    'deal 33 cards pokemon tcg' => undef,
    'deal 4 damage to target creature' => undef,
    'deal 4 u' => undef
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;