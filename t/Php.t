#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Php)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'php cwd' => test_spice(
        '/js/spice/php/cwd',
        call_type => 'include',
        caller => 'DDG::Spice::Php'
    )
);

done_testing;
