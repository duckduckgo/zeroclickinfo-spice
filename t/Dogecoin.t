#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Dogecoin )],
    'dogecoin' => test_spice(
        '/js/spice/dogecoin/',
        call_type => 'include',
        caller => 'DDG::Spice::Dogecoin',
        
    ),
    'dogecoin price' => test_spice(
        '/js/spice/dogecoin/',
        call_type => 'include',
        caller => 'DDG::Spice::Dogecoin',
        
    ),    
);

done_testing;

