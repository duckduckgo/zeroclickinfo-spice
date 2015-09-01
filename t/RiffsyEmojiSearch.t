#!/usr/bin/env perl
use utf8;
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::RiffsyEmojiSearch)],
    '👍' => test_spice(
        '/js/spice/riffsy_emoji_search/%F0%9F%91%8D',
        call_type => 'include',
        caller => 'DDG::Spice::RiffsyEmojiSearch'
    ),
);

done_testing;

