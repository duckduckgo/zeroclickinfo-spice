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
    
    # This IA should only trigger when a location is specified
    'sunrise'                           => undef,
    'what time is sunset'               => undef,
    'when is the sunrise'               => undef,
    'when does sun set'                 => undef,
    'when will the sun rise'            => undef,

    # Invalid cases
    'sunset at'                         => undef,
    'time and space museum'             => undef,
    'time complexity of qsort'          => undef,
    'running time of titanic'           => undef,
);

done_testing;
