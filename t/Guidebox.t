#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Guidebox::Getid )],
    
    # TV series    
    'free episodes of NCIS' => test_spice(
        '/js/spice/guidebox/getid/NCIS',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),

    'free episodes of Dexter' => test_spice(
        '/js/spice/guidebox/getid/Dexter',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),

    'recent episodes The Big Bang Theory' => test_spice(
        '/js/spice/guidebox/getid/The%20Big%20Bang%20Theory',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),
);

done_testing;

