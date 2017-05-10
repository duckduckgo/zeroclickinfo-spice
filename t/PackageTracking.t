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
    'C11422907783469 tracking number' => test_spice(
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

    # Parcelforce / Royal Mail
    'parcelforce track PBTM8041434001' => test_spice(
        '/js/spice/package_tracking/PBTM8041434001',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'royal mail track parcel QE001331410GB' => test_spice(
        '/js/spice/package_tracking/QE001331410GB',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'PBTM8237263001' => test_spice(
        '/js/spice/package_tracking/PBTM8237263001',
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # Bad Queries
    70000000000000000001 => undef,
    'what is 70000000000000000000' => undef,
    'luhn 1234554651' => undef,
    'KB2553549' => undef,
    '0000 0000 0000' => undef,
    '213-298-3781' => undef,
    '1-989-560-5363' => undef,
    '0409 427 893' => undef,
    '04961 9424600' => undef,
    '1-800-240-1371' => undef,
    '1 800 539-2968' => undef,
    '1 800 539 2968' => undef,
    '800-781-2677' => undef,
    '800 781-2677' => undef,
    '518 407 5448' => undef,
    '1234567890' => undef,
    'ups building 2 worldport' => undef,
    'ups building 2 worldport address' => undef,

    # Too long
    'fedex 123456789 123456789 123456789 1234' => undef,

    # Too short
    'usps 12345' => undef,

    # TODO: Display input form prompting for tracking number?
    'fedex package tracking' => undef,
    'fedex package tracker' => undef,
    'package tracking' => undef,
    'package tracking online' => undef,

    'fedex' => undef,
    'fedex website' => undef
    
    # Invalid query containing isbn
    'isbn 9780134494326' => undef
    '9780073380957 Isbn' => undef
    'ISBN 1490564098'  => undef
    '0394800133 isbn' => undef
);

done_testing;
