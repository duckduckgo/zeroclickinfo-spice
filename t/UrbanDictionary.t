#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::UrbanDictionary )],
    'urban dictionary cool' => test_spice(
        '/js/spice/urban_dictionary/cool',
        is_unsafe => 1,
        call_type => 'include',
        caller => 'DDG::Spice::UrbanDictionary'
    ),
    'urban dictionary ROTFL' => test_spice(
        '/js/spice/urban_dictionary/ROTFL',
        caller    => 'DDG::Spice::UrbanDictionary',
        is_unsafe => 1,
    ),
    'ud OMG' => test_spice(
        '/js/spice/urban_dictionary/OMG',
        caller    => 'DDG::Spice::UrbanDictionary',
        is_unsafe => 1,
    ),
    'ud ASD' => test_spice(
        '/js/spice/urban_dictionary/ASD',
        caller    => 'DDG::Spice::UrbanDictionary',
        is_unsafe => 1,
    ),
);

done_testing;
