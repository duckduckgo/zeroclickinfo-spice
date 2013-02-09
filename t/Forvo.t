#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Forvo )],
    'pronounce duck' => test_spice(
        '/js/spice/forvo/duck/empty',
        call_type => 'include',
        caller => 'DDG::Spice::Forvo',
        is_cached => 0
    ),
);

done_testing;

