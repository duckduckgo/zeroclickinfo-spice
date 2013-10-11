#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::HqTemp )],
    'temperature at duckduckgo' => test_spice(
        '/js/spice/hq_temp/',
        call_type => 'include',
        caller => 'DDG::Spice::HqTemp'
    ),
);

done_testing;

