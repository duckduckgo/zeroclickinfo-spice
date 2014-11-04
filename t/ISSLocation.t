#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ISSLocation )],
    'iss location' => test_spice(
        '/js/spice/iss_location/',
        call_type => 'include',
        caller => 'DDG::Spice::ISSLocation',
        is_unsafe => 1
    ),
    'iss position' => test_spice(
        '/js/spice/iss_location/',
        call_type => 'include',
        caller => 'DDG::Spice::ISSLocation',
        is_unsafe => 1
    ),
);

done_testing;
