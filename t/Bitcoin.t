#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin )],
    'bitcoin' => test_spice(
        '/js/spice/bitcoin/usd',
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
    'bitcoin eur' => test_spice(
        '/js/spice/bitcoin/eur',
        caller    => 'DDG::Spice::Bitcoin',
    ),
    'bitcoin cny' => test_spice(
        '/js/spice/bitcoin/cny',
        caller    => 'DDG::Spice::Bitcoin',
    ),
    '5 btc in usd' => test_spice(
        '/js/spice/bitcoin/usd/5',
        caller    => 'DDG::Spice::Bitcoin',
    ),
    '250 dkk in btc' => test_spice(
        '/js/spice/bitcoin/dkk/250',
        caller    => 'DDG::Spice::Bitcoin'
    ),
);

done_testing;

