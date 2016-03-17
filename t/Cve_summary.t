#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cve_summary )],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'cve CVE-2010-3333' => test_spice(
        '/js/spice/cve_summary/CVE-2010-3333',
        call_type => 'include',
        caller => 'DDG::Spice::Cve_summary'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;

