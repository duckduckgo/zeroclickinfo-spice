#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::WorldHeritageSites )],
    'world heritage argentina' => test_spice(
        '/js/spice/world_heritage_sites/argentina',
        call_type => 'include',
        caller => 'DDG::Spice::WorldHeritageSites',
    ),
    'unesco heritage sites argentina' => test_spice(
        '/js/spice/world_heritage_sites/argentina',
        call_type => 'include',
        caller => 'DDG::Spice::WorldHeritageSites',
    ),
    'unesco sites argentina' => test_spice(
        '/js/spice/world_heritage_sites/argentina',
        call_type => 'include',
        caller => 'DDG::Spice::WorldHeritageSites',
    ),
);

done_testing;
