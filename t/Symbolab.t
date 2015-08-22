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
        '/js/spice/symbolab/integral%20of%20x%5E2',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    'calculate x^2-1=0' => test_spice(
        '/js/spice/symbolab/x%5E2-1%3D0',
        call_type => 'include',
        caller => 'DDG::Spice::Symbolab',
        is_cashed => 1
    ), 
    'calculate' => undef,
<<<<<<< HEAD
    'calculate mortgae' => undef
=======
    'calculate mortgage' => undef
>>>>>>> bc9b5fb51184d2cda3454510b6906e841cf4ff34
);

done_testing;

