#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::PirateSpeak)],

    'pirate speak Good morning' => test_spice(
        '/js/spice/pirate_speak/Good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::PirateSpeak'
    ),
    
    'pirate talk Good morning' => test_spice(
        '/js/spice/pirate_speak/Good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::PirateSpeak'
    ),

    'Good morning to pirate' => test_spice(
        '/js/spice/pirate_speak/Good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::PirateSpeak'
    ),

    'Good morning in pirate' => test_spice(
        '/js/spice/pirate_speak/Good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::PirateSpeak'
    ),

    'translate to pirate Good morning' => test_spice(
        '/js/spice/pirate_speak/Good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::PirateSpeak'
    ),

    'jack pirate' => undef,
    
    'translate to english hello' => undef,
    
    'pirate jon snow' => undef,
    
    'piraaate talk like this' => undef,
);

done_testing;

