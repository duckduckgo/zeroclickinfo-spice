#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SteamDB )],
    'steamdb duckduckgo' => test_spice(
        '/js/spice/steam_db/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::SteamDB'
    ),
);

done_testing;
