#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::WordMap )],
    'similar to sound' => test_spice(
        '/js/spice/word_map/sound',
        call_type => 'include',
        caller => 'DDG::Spice::WordMap',
    ),
    'similar to sound' => test_spice(
        '/js/spice/word_map/sound',
        caller    => 'DDG::Spice::WordMap',
    ),
    'words like sound' => test_spice(
        '/js/spice/word_map/sound',
        caller    => 'DDG::Spice::WordMap',
    ),
    'similar to multi word query' => undef,
);

done_testing;

