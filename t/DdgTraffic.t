#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::DdgTraffic)],
    'ddg traffic' => test_spice(
        '/js/spice/ddg_traffic/1',
        call_type => 'include',
        caller => 'DDG::Spice::DdgTraffic'
    ),
);

done_testing;

