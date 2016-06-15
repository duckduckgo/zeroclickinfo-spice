#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::CveSummary )],
    # Test uppercase
    'CVE-2010-3333' => test_spice(
        '/js/spice/cve_summary/CVE-2010-3333',
        call_type => 'include',
        caller => 'DDG::Spice::CveSummary'
    ),
    # Test lowercase
    'cve-2010-3333' => test_spice(
        '/js/spice/cve_summary/CVE-2010-3333',
        call_type => 'include',
        caller => 'DDG::Spice::CveSummary'
    ),
    # broken queries that should not trigger
    'cve1234-5678' => undef,
    'cve 1234-5678' => undef,
    'cve cve-1234-5678' => undef,
    'CVE-2009-355' => undef
);

done_testing;

