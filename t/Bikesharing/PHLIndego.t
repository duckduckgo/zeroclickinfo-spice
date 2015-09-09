#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bikesharing::PHLIndego )],
    'philly indego' => test_spice(
        '/js/spice/bikesharing/phlindego/philly',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
     'indego bikeshare philly' => test_spice(
        '/js/spice/bikesharing/phlindego/philly',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
     'indego bikeshare philadelphia' => test_spice(
        '/js/spice/bikesharing/phlindego/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
    'philly bikeshare' => test_spice(
        '/js/spice/bikesharing/phlindego/philly',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
    'bikeshare philadelphia' => test_spice(
        '/js/spice/bikesharing/phlindego/philadelphia',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
     'bikeshare phl' => test_spice(
        '/js/spice/bikesharing/phlindego/phl',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
   'phl bikeshare' => test_spice(
        '/js/spice/bikesharing/phlindego/phl',
        call_type => 'include',
        caller => 'DDG::Spice::Bikesharing::PHLIndego',
    is_cached => 1,
    ),
    
    
 
    'bikeshare new york' => undef,
    'citibike washington' => undef,
);

done_testing;