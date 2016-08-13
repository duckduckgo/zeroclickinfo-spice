#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Glassdoor)],
   
    'company glassdoor' => test_spice(
        '/js/spice/glassdoor/glassdoor',
        call_type => 'include',
        caller => 'DDG::Spice::Glassdoor'
    ),
    
    'company google' => test_spice(
        '/js/spice/glassdoor/google',
        call_type => 'include',
        caller => 'DDG::Spice::Glassdoor'
    ),
   
);

done_testing;

