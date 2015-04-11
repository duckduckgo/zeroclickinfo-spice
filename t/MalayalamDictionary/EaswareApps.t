#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MalayalamDictionary::EaswareApps)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'malayalam meaning test' => test_spice(
        '/js/spice/malayalam_dictionary/easware_apps/test',
        call_type => 'include',
        caller => 'DDG::Spice::MalayalamDictionary::EaswareApps',
    ),'go in malayalam' => test_spice(
        '/js/spice/malayalam_dictionary/easware_apps/go',
        call_type => 'include',
        caller => 'DDG::Spice::MalayalamDictionary::EaswareApps',
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

