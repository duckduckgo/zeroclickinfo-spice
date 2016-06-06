#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(
        DDG::Spice::Symbolab
    )],
    'calculate integral of x^2' => test_spice(
        '/js/spice/symbolab/calculate%20integral%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    'calculate x^2-1=0' => test_spice(
        '/js/spice/symbolab/calculate%20x%5E2-1%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    'calculate \tan(x)=0' => test_spice(
        '/js/spice/symbolab/calculate%20%5Ctan%28x%29%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'integral of x^2' => test_spice(
        '/js/spice/symbolab/integral%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'integrate x^2' => test_spice(
        '/js/spice/symbolab/integrate%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'integration of x^2' => test_spice(
        '/js/spice/symbolab/integration%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'antiderivative of x^2' => test_spice(
        '/js/spice/symbolab/antiderivative%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'derivative of x^2' => test_spice(
        '/js/spice/symbolab/derivative%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'derive x^2' => test_spice(
        '/js/spice/symbolab/derive%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'instant' => undef,
    'calculate' => undef,
    'calculate mortgage' => undef
);

done_testing;

