#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SteamSales )],
    'steam sales' => test_spice(
	'/js/spice/steam_sales/',
        call_type => 'include',
        caller => 'DDG::Spice::SteamSales'
    ),
);

done_testing;
