#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Cargo )],
    'cargo gcc' => test_spice(
        '/js/spice/cargo/gcc',
        call_type => 'include',
        caller => 'DDG::Spice::Cargo',
    ),
);

done_testing;
