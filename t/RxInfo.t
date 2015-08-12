#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::RxInfo'
    ],
    # multiple filters (color, shape) that returns multiple results
    'pill red round' => test_spice(
        '/js/spice/rx_info/red%20round/0',
        call_type => 'include',
        caller => 'DDG::Spice::RxInfo',
    ),
    # returns a single result via NDC search
    'rxinfo 68180-0481-01' => test_spice(
        '/js/spice/rx_info/68180-0481-01/1',
        call_type => 'include',
        caller => 'DDG::Spice::RxInfo',
    ),
    # multiple filters (imprint, color) that returns multiple results
    'pill LL blue' => test_spice(
        '/js/spice/rx_info/LL%20blue/0',
        call_type => 'include',
        caller => 'DDG::Spice::RxInfo',
    ),
    # no results
    'rxinfo gibberish' => test_spice(
        '/js/spice/rx_info/gibberish/1',
        call_type => 'include',
        caller => 'DDG::Spice::RxInfo',
    ),
);

done_testing;
