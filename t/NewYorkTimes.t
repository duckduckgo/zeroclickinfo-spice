#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::NewYorkTimes)],
    'new york times gone girl' => test_spice(
        '/js/spice/new_york_times/gone%20girl',
        caller => 'DDG::Spice::NewYorkTimes'
    ),
);

done_testing;

