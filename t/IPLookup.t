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
    'dns 10.20.30.40' => test_spice(
        '/js/spice/iplookup/10.20.30.40',
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
    'reverse dns for a.b.c.d' => undef

);

done_testing;
