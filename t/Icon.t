#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Icon)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'bomb icon' => test_spice(
        '/js/spice/icon/bomb/all',
        call_type => 'include',
        caller => 'DDG::Spice::Icon'
    ),
    'free bomb icon' => test_spice(
        '/js/spice/icon/bomb/0',
        call_type => 'include',
        caller => 'DDG::Spice::Icon'
    ),
    'premium bomb icon' => test_spice(
        '/js/spice/icon/bomb/1',
        call_type => 'include',
        caller => 'DDG::Spice::Icon'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'iconfinder api' => undef,
    'free icon' => undef,
    'premium icon' => undef,
    'free premium icon' => undef,
);

done_testing;

