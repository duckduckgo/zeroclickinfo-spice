#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Proxy)],

    'proxy' => test_spice(
        '/js/spice/proxy/1',
        call_type => 'include',
        caller => 'DDG::Spice::Proxy'
    ),
    'proxy list' => test_spice(
        '/js/spice/proxy/1',
        call_type => 'include',
        caller => 'DDG::Spice::Proxy'
    )
);

done_testing;

