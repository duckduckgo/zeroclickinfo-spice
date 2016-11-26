#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cookbooks )],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'mysql cookbook' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    'cookbook mysql' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    'berks install mysql' => test_spice(
        '/js/spice/cookbooks/mysql',
        call_type => 'include',
        caller => 'DDG::Spice::Cookbooks'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;
