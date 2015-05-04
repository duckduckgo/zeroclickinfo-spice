#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Equaldex)],

    'lgbt china' => test_spice(
        '/js/spice/equaldex/china',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),

    'lesbian rights cyprus' => test_spice(
        '/js/spice/equaldex/cyprus',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'gay rights australia' => test_spice(
        '/js/spice/equaldex/australia',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'transgender rights usa' => test_spice(
        '/js/spice/equaldex/usa',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),

    'about lgbt rights' => undef,
);

done_testing;

