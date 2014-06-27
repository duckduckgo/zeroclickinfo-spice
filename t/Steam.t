#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(
        DDG::Spice::Steam::Specials
    )],
    'steam specials' => test_spice(
        "/js/spice/steam/specials/",
	call_type => 'include',
        caller => 'DDG::Spice::Steam::Specials'
    ),
    'steam offers' => test_spice(
        "/js/spice/steam/specials/",
        caller => 'DDG::Spice::Steam::Specials'
    ),
);

done_testing;

