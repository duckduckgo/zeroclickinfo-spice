#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Glassdoor)],
   
    'glassdoor quixey' => test_spice(
        '/js/spice/glassdoor/quixey',
        call_type => 'include',
        caller => 'DDG::Spice::Glassdoor'
    ),
    
    'glassdoor google' => test_spice(
        '/js/spice/glassdoor/google',
        call_type => 'include',
        caller => 'DDG::Spice::Glassdoor'
    ),
   
);

done_testing;

