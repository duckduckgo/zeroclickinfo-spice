#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::UFC)],
    'ufc fighters' => test_spice(
        '/js/spice/ufc/',
        call_type => 'include',
        caller => 'DDG::Spice::UFC'
    ),
    'ufc live' => undef,
);

done_testing;

