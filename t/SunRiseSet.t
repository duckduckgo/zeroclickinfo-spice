#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Request;
use DDG::Test::Location;
use DDG::Test::Spice;

spice proxy_cache_valid => "12h";

my @oslo_norway = (
    '/js/spice/sun_rise_set/oslo%20norway',
    call_type => 'include',
    caller    => 'DDG::Spice::SunRiseSet'
);

my @new_delhi_india = (
    '/js/spice/sun_rise_set/new%20delhi%20india',
    call_type => 'include',
    caller    => 'DDG::Spice::SunRiseSet'
);

ddg_spice_test(
    [qw( DDG::Spice::SunRiseSet)],
    'sunset oslo'                       => test_spice(@oslo_norway),
    'sunrise oslo'                      => test_spice(@oslo_norway),
    'sunrise in oslo'                   => test_spice(@oslo_norway),
    'sunset today oslo'                 => test_spice(@oslo_norway),
    'sunset time oslo'                  => test_spice(@oslo_norway),
    'when is the sunrise in oslo'       => test_spice(@oslo_norway),
    'when is the sunset in oslo'        => test_spice(@oslo_norway),
    'when is sunrise in oslo'           => test_spice(@oslo_norway),
    'when is sunset in oslo'            => test_spice(@oslo_norway),
    'when does the sun rise in oslo'    => test_spice(@oslo_norway),
    'when does the sun set in oslo'     => test_spice(@oslo_norway),
    'when does sun set in oslo'         => test_spice(@oslo_norway),
    'when does sun rise in oslo'        => test_spice(@oslo_norway),
    'when will the sun rise in oslo'    => test_spice(@oslo_norway),
    'when will the sun set in oslo'     => test_spice(@oslo_norway),
    'when will sun rise in oslo'        => test_spice(@oslo_norway),
    'when will sun set in oslo'         => test_spice(@oslo_norway),
    
    # undef because only sunset/sunrise without location returns phoenixville
    'sunrise'                           => undef,
    'what time is sunset'               => undef,

    # invalid cases
    'sunset at'                         => undef,
    'time and space museum'             => undef,
    'time complexity of qsort'          => undef,
    'running time of titanic'           => undef,
    
    # location-aware tests   
    DDG::Request->new(
        query_raw => "when is the sunrise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when is the sunset",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
        
    DDG::Request->new(
        query_raw => "when is sunrise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when is sunset",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when does the sun rise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when does the sun set",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when does sun rise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when does sun set",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when will the sun rise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when will the sun set",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when will sun rise",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
    
    DDG::Request->new(
        query_raw => "when will sun set",
        location => test_location("in")
    ) => test_spice(@new_delhi_india),
);

done_testing;

