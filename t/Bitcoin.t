#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin )],
    'bitcoin' => test_spice(
        '/js/spice/bitcoin/',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',
        
    ),
    'bit coin eur' => test_spice(
        '/js/spice/bitcoin/eur',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',      
    ),
    'bitcoin exchange sek' => test_spice(
        '/js/spice/bitcoin/sek',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',      
    ),
    'bit coin exchange pln' => test_spice(
        '/js/spice/bitcoin/pln',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin',      
    ),
);

done_testing;

