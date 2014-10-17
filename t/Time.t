#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Time)],
    'example query' => test_spice(
        '/js/spice/time/query',
        call_type => 'include',
        caller => 'DDG::Spice:Time'
    )
);

done_testing;

