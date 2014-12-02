#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ISSLocation )],
    'iss location' => test_spice(
        '/js/spice/isslocation/',
        call_type => 'include',
        caller => 'DDG::Spice::ISSLocation',
        is_unsafe => 0
    ),
    'iss position' => test_spice(
        '/js/spice/isslocation/',
        call_type => 'include',
        caller => 'DDG::Spice::ISSLocation',
        is_unsafe => 0
    ),
);

done_testing;
