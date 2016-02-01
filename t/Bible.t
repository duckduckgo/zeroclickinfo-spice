#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bible )],
    'james 1:26' => test_spice(
        '/js/spice/bible/james%201%3A26',
        call_type => 'include',
        caller => 'DDG::Spice::Bible'
    ),
    'genesis 15:7' => test_spice(
        '/js/spice/bible/genesis%2015%3A7',
        caller    => 'DDG::Spice::Bible',
    ),
    'bible genesis 26:4' => test_spice(
        '/js/spice/bible/genesis%2026%3A4',
        caller    => 'DDG::Spice::Bible',
    ),
);

done_testing;

