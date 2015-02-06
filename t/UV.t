#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

#for location testing
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::UV)],
    'uv' => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV'
    ),
    'uv index' => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV'
    ),
    'current uv index' => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV'
    ),
    'current uv index ?' => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV'
    ),
    'uv acronym' => undef,
    #only locations in the US are covered atm
    DDG::Request->new(
        query_raw => "uv",
        location => test_location("de")
    ) => undef, 
    DDG::Request->new(
        query_raw => "uv",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV',
    ),
    'what is the current uv index?' => test_spice(
        '/js/spice/uv/Phoenixville/PA',
        call_type => 'include',
        caller => 'DDG::Spice::UV'
    ),
    'ultraviolet' => undef,
);

done_testing;

