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
        call_type => 'include',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),

    'free episodes of The Big Bang Theory' => test_spice(
        '/js/spice/guidebox/getid/The Big Bang Theory',
        call_type => 'include',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),
);

done_testing;

