#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Forvo )],
    'pronounce duck' => test_spice(
        '/js/spice/forvo/duck/empty',
        caller => 'DDG::Spice::Forvo',
    ),
);

done_testing;
