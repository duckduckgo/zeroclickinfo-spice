#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::MinecraftUUID)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'mcuuid Notch' => test_spice(
        '/js/spice/minecraft_uuid/query',
        call_type => 'include',
        caller => 'DDG::Spice::MinecraftUUID'
    ),
    'minecraft uuid Notch' => test_spice(
        '/js/spice/minecraft_uuid/query',
        call_type => 'include',
        caller => 'DDG::Spice::MinecraftUUID'
    ),
    'Minecraft UUID Notch' => test_spice(
        '/js/spice/minecraft_uuid/query',
        call_type => 'include',
        caller => 'DDG::Spice::MinecraftUUID'
    ),
    'Minecraft UUID Jeb_' => test_spice(
        '/js/spice/minecraft_uuid/query',
        caller => 'DDG::Spice::MinecraftUUID'
    ),
    'mcuuid No' => undef,
    'mcuuid NotchNotchNotchNotch' => undef,
    'mcuuid Notch_ pls' => undef,
    'mcuuid' => undef,
);

done_testing;

