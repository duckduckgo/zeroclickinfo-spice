#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::RiffsyGifSearch)],
    'dog gif' => test_spice(
        '/js/spice/riffsy_gif_search/dog',
        call_type => 'include',
        caller => 'DDG::Spice::RiffsyGifSearch'
    ),
    'dog riffs' => test_spice(
        '/js/spice/riffsy_gif_search/dog',
        call_type => 'include',
        caller => 'DDG::Spice::RiffsyGifSearch'
    ),
    'riffsy lol' => test_spice(
        '/js/spice/riffsy_gif_search/lol',
        call_type => 'include',
        caller => 'DDG::Spice::RiffsyGifSearch'
    ),
);

done_testing;

