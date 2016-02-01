#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MissingKids)],

    # primary example
    'Missing kid' => test_spice(
        '/js/spice/missing_kids/PA',
        call_type => 'include',
        caller => 'DDG::Spice::MissingKids',
    ),
    
    'Missing children' => test_spice(
        '/js/spice/missing_kids/PA',
        call_type => 'include',
        caller => 'DDG::Spice::MissingKids',
    ),


    'missing' => undef,

);




done_testing;