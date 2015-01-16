#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Instagram)],
    'instagram C' => test_spice(
        '/js/spice/instagram/C',
        call_type => 'include',
        caller => 'DDG::Spice::Instagram',
        is_cached => 1
    ),
    'instagram short-code_withMultiple123Characters' => test_spice(
        '/js/spice/instagram/short-code_withMultiple123Characters',
        call_type => 'include',
        caller => 'DDG::Spice::Instagram'
    )
);

done_testing;


