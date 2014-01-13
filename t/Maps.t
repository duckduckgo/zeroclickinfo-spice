#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maps )],
    'nearest primos' => test_spice(
        '/js/spice/maps/primos',
        call_type => 'include',
        caller => 'DDG::Spice::Maps'
    ),
);

done_testing;

