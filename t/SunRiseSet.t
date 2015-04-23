#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice proxy_cache_valid => "12h";

my @oslo_norway = (
    '/js/spice/sun_rise_set/oslo%20norway',
    call_type => 'include',
    caller    => 'DDG::Spice::SunRiseSet'
);

ddg_spice_test(
    [qw( DDG::Spice::SunRiseSet)],
    'sunset oslo'              => test_spice(@oslo_norway),
    'sunrise oslo'             => test_spice(@oslo_norway),
    'sunrise in oslo'          => test_spice(@oslo_norway),
    'sunset today oslo'        => test_spice(@oslo_norway),
    'sunset time oslo'         => test_spice(@oslo_norway),

    # undef because only sunset/sunrise without location returns phoenixville
    'sunrise'                  => undef,
    'what time is sunset'      => undef,

    # invalid cases
    'sunset at'                => undef,
    'time and space museum'    => undef,
    'time complexity of qsort' => undef,
    'running time of titanic'  => undef,
);

done_testing;

