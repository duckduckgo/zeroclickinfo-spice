#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [ 
        "DDG::Spice::NobelPrize" 
    ],
    
    # Both year and category
    'nobel 1950 physics' => test_spice(
        '/js/spice/nobel_prize/1950-physics',
        call_type => 'include',
        caller => 'DDG::Spice::NobelPrize'
    ),
    
    # Only year
    'winner 2000 nobel' => test_spice(
        '/js/spice/nobel_prize/2000-',
        call_type => 'include',
        caller => 'DDG::Spice::NobelPrize'
    ),
    
    # Only Category is given
    'nobel winners in medicine' => test_spice(
        '/js/spice/nobel_prize/-medicine',
        call_type => 'include',
        caller => 'DDG::Spice::NobelPrize'
    ),
    
    # Take only first of given years
    'nobel laureates of 2004 and 2005' => test_spice(
        '/js/spice/nobel_prize/2004-',
        call_type => 'include',
        caller => 'DDG::Spice::NobelPrize'
    ),
    
    # Take only the first of given categories as well.
    'nobel winners of 1984 and 1985 in Peace and economy' => test_spice(
        '/js/spice/nobel_prize/1984-peace',
        call_type => 'include',
        caller => 'DDG::Spice::NobelPrize'
    ),
);

done_testing;