#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::Symbolab)],
    '\int x^2' => test_spice(
        '/js/spice/symbolab/%5Cint%20x%5E2',
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
    'x^2-1=0' => test_spice(
        '/js/spice/symbolab/x%5E2-1%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    '\tan(x)=0' => test_spice(
        '/js/spice/symbolab/%5Ctan%28x%29%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'tan(x)=0' => test_spice(
        '/js/spice/symbolab/tan%28x%29%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'x+2>3x' => test_spice(
        '/js/spice/symbolab/x%2B2%3E3x',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 

    '\int \left(x^2+ax-3\right)^2dx' => test_spice(
        '/js/spice/symbolab/%5Cint%20%5Cleft%28x%5E2%2Bax-3%5Cright%29%5E2dx',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 

    '\int x^2 dx' => test_spice(
        '/js/spice/symbolab/%5Cint%20x%5E2%20dx',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 

    'x^2 = 0' => test_spice(
        '/js/spice/symbolab/x%5E2%20%3D%200',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 

    'derivative x^2' => test_spice(
        '/js/spice/symbolab/derivative%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'derivative x' => test_spice(
        '/js/spice/symbolab/derivative%20x',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 

    'x*x+2x-8=3' => test_spice(
        '/js/spice/symbolab/x%2Ax%2B2x-8%3D3',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    
    'expand 2(a+b)^2' => test_spice(
        '/js/spice/symbolab/expand%202%28a%2Bb%29%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
       
    # some cases that shouldn't match
    'instant' => undef,
    'calculate' => undef,
    'solve heat sink' => undef,
    'calculate mortgage' => undef,
    'sec_error_ocsp_invalid_signing_cert' => undef,
    'calculate cost termite fumigation in orange county, california' => undef,
    'find social security benefits' => undef,
    'find sine' => undef,
    'find the y-intercept a quadraric' => undef,
    'find cost a diamond' => undef,
    'calculate total cost' => undef,


    # default DDG calculate goodie catches this, so Symbolab shouldn't
    '5 * 20 + 55' => undef,
    '2+2' => undef,
    '2^63' => undef,
    'sqrt(12)' => undef,
    'sin(12)' => undef,
    'cos(12)' => undef,
    'tan(12)' => undef,
    'cot(12)' => undef,
    'csc(12)' => undef,
    'sec(12)' => undef,
    'ln(12)' => undef,
    'log(12)' => undef,
	
);

done_testing;

