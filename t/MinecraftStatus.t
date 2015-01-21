#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::MinecraftStatus )],
    'minecraft status' => test_spice(
        '/js/spice/minecraft_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::MinecraftStatus'
    ),
    'mc status' => test_spice(
        '/js/spice/minecraft_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::MinecraftStatus'
    ),
    'mcstatus' => undef;
);

done_testing;
