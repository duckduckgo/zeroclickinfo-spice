#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SoundCloud )],
    'soundcloud ray bradbury' => test_spice(
        'ray%20bradbury',
        call_type => 'self',
        caller => 'DDG::Spice::SoundCloud',
    ),
    'sc kavinsky' => test_spice(
        'kavinsky',
        call_type => 'self',
        caller => 'DDG::Spice::SoundCloud',
    ),
    'sc the new yorker' => test_spice(
        'the%20new%20yorker',
        caller    => 'DDG::Spice::SoundCloud',
        call_type => 'self',
    ),
);

alt_to_test('DDG::Spice::SoundCloud', ['sound_cloud_result']);

done_testing;
