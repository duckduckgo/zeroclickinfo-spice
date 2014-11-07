#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Rainfall )],
    'rainfall Australia' => test_spice(
        '/js/spice/rainfall/AUS/2012%3A2012/Australia',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall in the united states of america' => test_spice(
        '/js/spice/rainfall/USA/2012%3A2012/The%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall aUstralia' => test_spice(
        '/js/spice/rainfall/AUS/2012%3A2012/Australia',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall aus' => test_spice(
        '/js/spice/rainfall/AUS/2012%3A2012/Australia',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall bol' => test_spice(
        '/js/spice/rainfall/BOL/2012%3A2012/Bolivia',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall United States of America' => test_spice(
        '/js/spice/rainfall/USA/2012%3A2012/The%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    'rainfall Ireland' => test_spice(
        '/js/spice/rainfall/IRL/2012%3A2012/Ireland',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
    
    'rainfall USA' => test_spice(
        '/js/spice/rainfall/USA/2012%3A2012/The%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::Rainfall',      
    ),
);

done_testing;
