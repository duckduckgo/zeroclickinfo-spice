#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SkiResorts)],
    # Valid queries
    'ski Chamonix' => test_spice(
        '/js/spice/ski_resorts/chamonix',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'ski chamonix' => test_spice(
        '/js/spice/ski_resorts/chamonix',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'Mayrhofen piste map' => test_spice(
        '/js/spice/ski_resorts/mayrhofen',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'ski conditions at Zugspitze' => test_spice(
        '/js/spice/ski_resorts/zugspitze',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'St Anton skiing' => test_spice(
        '/js/spice/ski_resorts/st-anton',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'ski in Chamonix' => test_spice(
        '/js/spice/ski_resorts/chamonix',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'Adelboden resort map' => test_spice(
        '/js/spice/ski_resorts/adelboden',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'piste map Adelboden' => test_spice(
        '/js/spice/ski_resorts/adelboden',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'snowboarding St Anton' => test_spice(
        '/js/spice/ski_resorts/st-anton',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    # Invalid queries
    'Morzine' => undef,
    'London' => undef,
    'skiing in London' => undef,
    'Mountain' => undef
);

done_testing;

