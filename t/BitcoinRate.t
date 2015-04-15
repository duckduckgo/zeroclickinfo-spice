#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BitcoinRate )],
    'bitcoin' => test_spice(
        '/js/spice/bitcoin_rate/',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinRate',
    ),
    'bit coin eur' => test_spice(
        '/js/spice/bitcoin_rate/eur',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinRate',
    ),
    'bitcoin exchange sek' => test_spice(
        '/js/spice/bitcoin_rate/sek',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinRate',
    ),
    'bit coin exchange pln' => test_spice(
        '/js/spice/bitcoin_rate/pln',
        call_type => 'include',
        caller => 'DDG::Spice::BitcoinRate',
    ),
    'bitcoin eur' => test_spice(
        '/js/spice/bitcoin_rate/eur',
        caller    => 'DDG::Spice::BitcoinRate',
    ),
    'bitcoin cny' => test_spice(
        '/js/spice/bitcoin_rate/cny',
        caller    => 'DDG::Spice::BitcoinRate',
    ),
);

done_testing;

