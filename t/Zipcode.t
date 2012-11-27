#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Zipcode)],
    '19301' => test_spice(
        '/js/spice/zipcode/19301/ZZ',
        call_type => 'include',
        caller => 'DDG::Spice::Zipcode'
    ),
    '19301 Turkey' => test_spice(
        '/js/spice/zipcode/19301/TR',
        call_type => 'include',
        caller => 'DDG::Spice::Zipcode'
    ),
);

done_testing;

