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

    # CanadaPost
    '7316971234436767' => test_spice(
        "/js/spice/package_tracking/7316971234436767",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '2005706113805288' => test_spice(
        "/js/spice/package_tracking/2005706113805288",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '4007693052785226' => test_spice(
        "/js/spice/package_tracking/4007693052785226",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    '3129144101026356' => test_spice(
        "/js/spice/package_tracking/3129144101026356",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # HKDK
    'CU123456789DK' => test_spice(
        "/js/spice/package_tracking/CU123456789DK",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),
    'EE123456789HK' => test_spice(
        "/js/spice/package_tracking/EE123456789HK",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'
    ),

    # IPS
    'EM999999999IN' => test_spice(
        "/js/spice/package_tracking/EM999999999IN",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'

    ),
    'em123456789hr' => test_spice(
        "/js/spice/package_tracking/em123456789hr",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'

    ),
    'EM 999 999 999 IN' => test_spice(
        "/js/spice/package_tracking/EM999999999IN",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'

    ),

    # LaserShip
    'LL12345678' => test_spice(
        "/js/spice/package_tracking/LL12345678",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'

    ),
    'LL 12345678' => test_spice(
        "/js/spice/package_tracking/LL12345678",
        call_type => 'include',
        caller => 'DDG::Spice::PackageTracking'

    ),
		
    # OnTrac
    'C11422907783469' => test_spice(
        "/js/spice/package_tracking/C11422907783469",
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
    'ups building 2 worldport' => undef,
    'ups building 2 worldport address' => undef,
    '1LS12345678999999999' => undef,
    'hook-ups anime' => undef,
    'ubuntu-server package' => undef,
    'dhl-sendungsverfolgung' => undef,

    ## Bad UPS
    '205495077' => undef,
    '199151188' => undef,
    '085911287' => undef,
    'T9999999999' => undef,

    ## Bad DHL
    '8004045172' => undef,
    '0957156239' => undef,
    '8007776116' => undef,
    '6311245247' => undef,
    '6263467015' => undef,


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
    'fedex website' => undef,

    # Invalid query containing isbn
    'isbn 9780134494326' => undef,
    'Isbn9780073380957' => undef,
    '1490564098 ISBN' => undef,
    'isbn 0394800133' => undef
);

done_testing;
