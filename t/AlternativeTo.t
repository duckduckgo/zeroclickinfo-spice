#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::AlternativeTo )],
    'what alternativeto with duck' => test_spice(
        '/js/spice/alternative_to/duck',
        call_type => 'include',
        caller => 'DDG::Spice::AlternativeTo'
    ),
);

done_testing;

