#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::PackageTracking)],
    'shipping status C11422907783469' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
);

done_testing;