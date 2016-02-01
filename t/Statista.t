#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Statista )],
    'fifa statistics' => test_spice(
        '/js/spice/statista/fifa',
        call_type => 'include',
        caller => 'DDG::Spice::Statista',
    ),
    'statistics on divorce' => test_spice(
        '/js/spice/statista/divorce',
        call_type => 'include',
        caller => 'DDG::Spice::Statista',
    ),
);

done_testing;
