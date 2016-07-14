#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::PackageTracking)],
    'shipping status C11422907783469' => test_spice(
        '/js/spice/package_tracking/c11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'package C11422907783469' => test_spice(
        '/js/spice/package_tracking/c11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'ontrac C11422907783469' => test_spice(
        '/js/spice/package_tracking/c11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'ontrac package C11422907783469' => test_spice(
        '/js/spice/package_tracking/c11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'C11422907783469 ontrac package' => test_spice(
        '/js/spice/package_tracking/c11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # TODO: Display input form prompting for tracking number?
    'fedex package tracking' => undef,
    'package tracking' => undef,
    'package tracking online' => undef,

    'fedex' => undef,
    'fedex website' => undef,
    'fedex website' => undef
);

done_testing;
