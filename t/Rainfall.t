#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Rainfall )],
    'rainfall Australia' => test_spice(
        '/js/spice/rainfall/AUS',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall aUstralia' => test_spice(
        '/js/spice/rainfall/AUS',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall United States of America' => test_spice(
        '/js/spice/rainfall/USA',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall Ireland' => test_spice(
        '/js/spice/rainfall/IRL',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
);

done_testing;
