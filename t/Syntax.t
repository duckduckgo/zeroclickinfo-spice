#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Syntax)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    'syntax java for loop' => test_spice(
        '/js/spice/syntax/java%20for%20loop',
        call_type => 'include',
        caller => 'DDG::Spice::Syntax'
    ),
    # multiple results
    'syntax for loop' => test_spice(
        '/js/spice/syntax/for%20loop',
        call_type => 'include',
        caller => 'DDG::Spice::Syntax'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'syntaxsomething' => undef,
);

done_testing;

