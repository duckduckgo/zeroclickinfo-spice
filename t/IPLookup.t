#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::IPLookup )],
    'reverse dns 8.8.8.8' => test_spice(
        '/js/spice/iplookup/8.8.8.8',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'reverse dns for 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'reverse dns of 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'reverse dns lookup 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'dns of 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'reverse ip lookup 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'whois 1.2.3.4' => test_spice(
        '/js/spice/iplookup/1.2.3.4',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    
    'reverse dns 256.8.8.8' => undef,
    'reverse dns a.b.c.d' => undef,
    'reverse dns duckduckgo.com' => undef,
    'reverse dns for a.b.c.d' => undef,
    'reverse dns 256.8.8.8' => undef,
    
    # Private IP Tests
    'reverse dns 10.20.30.40' => undef,
    'reverse dns 192.168.1.1' => undef,
    'reverse dns 127.0.0.1' => undef,
    'reverse dns 172.16.1.1' => undef,
    'reverse dns fde3:66dd:5c52:263' => undef,
    
    'reverse dns for 2607:f0d0:1002:0051:0000:0000:0000:0004' => test_spice(
        '/js/spice/iplookup/2607%3Af0d0%3A1002%3A0051%3A0000%3A0000%3A0000%3A0004',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    'ip lookup for 5.6.7.8' => test_spice(
        '/js/spice/iplookup/5.6.7.8',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup'
    ),
    'reverse dns for fe80::200:f8ff:fe21:67cf' => test_spice(
        '/js/spice/iplookup/fe80%3A%3A200%3Af8ff%3Afe21%3A67cf',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup',
    ),
    '5.6.7.8' => test_spice(
        '/js/spice/iplookup/5.6.7.8',
        call_type => 'include',
        caller => 'DDG::Spice::IPLookup'
    ),
    '1.2.3.4/24' => undef,
    '1.2.3.4 255.255.0.0' => undef,
    '1.2.3.4/255.255.0.0' => undef,
);

done_testing;

