#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::AlternativeTo )],
    'alternative to windows' => test_spice(
        '/js/spice/alternative_to/windows/all/',
        caller => 'DDG::Spice::AlternativeTo'
    ),
);

done_testing;

