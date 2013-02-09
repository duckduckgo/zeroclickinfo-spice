#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SoundCloud )],
    'soundcloud ray bradbury' => test_spice(
        '/js/spice/sound_cloud/ray%20bradbury',
        call_type => 'include',
        caller => 'DDG::Spice::SoundCloud',
        is_cached => 0
    ),
    'sc kavinsky' => test_spice(
        '/js/spice/sound_cloud/kavinsky',
        call_type => 'include',
        caller => 'DDG::Spice::SoundCloud',
        is_cached => 0
    ),
);

done_testing;

