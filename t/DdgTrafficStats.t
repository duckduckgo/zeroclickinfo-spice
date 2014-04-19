#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DdgTrafficStats )],
    'ddg traffic' => test_spice(
        '/js/spice/ddg_traffic_stats/',
        call_type => 'include',
        caller => 'DDG::Spice::DdgTrafficStats',
    ),
    'duckduckgo search traffic' => test_spice(
        '/js/spice/ddg_traffic_stats/',
        call_type => 'include',
        caller => 'DDG::Spice::DdgTrafficStats',
    ),
    'duckduckgo search stats' => test_spice(
        '/js/spice/ddg_traffic_stats/',
        call_type => 'include',
        caller => 'DDG::Spice::DdgTrafficStats',
    )
);

done_testing;
