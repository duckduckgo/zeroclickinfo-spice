#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Equaldex)],
    
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
        '/js/spice/equaldex/united%20states',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'lesbian rights in cyprus' => test_spice(
        '/js/spice/equaldex/cyprus',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'gay rights in australia' => test_spice(
        '/js/spice/equaldex/australia',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'gay laws in poland' => test_spice(
        '/js/spice/equaldex/poland',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'lgbt laws in spain' => test_spice(
        '/js/spice/equaldex/spain',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'gay laws poland' => test_spice(
        '/js/spice/equaldex/poland',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'lgbt laws spain' => test_spice(
        '/js/spice/equaldex/spain',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'lgbt laws in png' => test_spice(
        '/js/spice/equaldex/papua%20new%20guinea',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'gay laws can' => test_spice(
        '/js/spice/equaldex/canada',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),
    
    'lgbt laws mx' => test_spice(
        '/js/spice/equaldex/mexico',
        call_type => 'include',
        caller => 'DDG::Spice::Equaldex'
    ),

    'about lgbt rights' => undef,

);

done_testing;

