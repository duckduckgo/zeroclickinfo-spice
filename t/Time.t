#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    'time Amsterdam' => test_spice(
        '/js/spice/time/Amsterdam',
        call_type => 'include',
        caller => 'DDG::Spice:Time'
    )
);

done_testing;

