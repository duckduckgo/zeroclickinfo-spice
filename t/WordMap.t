#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::WordMap )],
    'word map' => test_spice(
        '/js/spice/word_map/sound',
        call_type => 'include',
        caller => 'DDG::Spice::WordMap',
    ),
);

done_testing;

