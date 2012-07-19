#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::HqTemp )],
    'what hqtemp with duck' => test_spice(
        '/js/spice/hq_temp/duck',
        call_type => 'include',
        caller => 'DDG::Spice::HqTemp'
    ),
);

done_testing;

