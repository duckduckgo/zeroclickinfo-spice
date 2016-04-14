#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Piratetalk)],
    'pirate speak hello' => test_spice(
        '/js/spice/piratetalk/hello',
        call_type => 'include',
        caller => 'DDG::Spice::Piratetalk'
    ),
    
    'pirate talk hello how are you' => test_spice(
        '/js/spice/piratetalk/hello%20how%20are%20you',
        call_type => 'include',
        caller => 'DDG::Spice::Piratetalk'
    ),
    
    'translate to pirate good morning' => test_spice(
    '/js/spice/piratetalk/good%20morning',
        call_type => 'include',
        caller => 'DDG::Spice::Piratetalk'
    ),
    
    'pirate jon snow' => undef,
    
    'piraaate talk like this' => undef,
);

done_testing;

