#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::PackageTracking)],

    # Generic
    'shipping status C11422907783469' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'package C11422907783469' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'ontrac C11422907783469' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'ontrac package C11422907783469' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'C11422907783469 ontrac package' => test_spice(
        '/js/spice/package_tracking/C11422907783469',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # Fedex
    'fedex 9241990100130206401644' => test_spice(
        '/js/spice/package_tracking/9241990100130206401644',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '178440515632684' => test_spice(
        '/js/spice/package_tracking/178440515632684',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '9612804882227378545377' => test_spice(
        '/js/spice/package_tracking/9612804882227378545377',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # UPS
    'ups 1Z0884XV0399906189' => test_spice(
        '/js/spice/package_tracking/1Z0884XV0399906189',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '1Z0884XV0399906189' => test_spice(
        '/js/spice/package_tracking/1Z0884XV0399906189',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # USPS
    'EA 000 000 000 US' => test_spice(
        '/js/spice/package_tracking/EA000000000US',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'usps 7000 0000 0000 0000 0000' => test_spice(
        '/js/spice/package_tracking/70000000000000000000',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'usps 37346365253153' => test_spice(
        '/js/spice/package_tracking/37346365253153',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # Bad Queries
    70000000000000000001 => undef,
    'what is 70000000000000000000' => undef,


    # TODO: Display input form prompting for tracking number?
    'fedex package tracking' => undef,
    'package tracking' => undef,
    'package tracking online' => undef,

    'fedex' => undef,
    'fedex website' => undef,
    'fedex website' => undef
);

done_testing;
