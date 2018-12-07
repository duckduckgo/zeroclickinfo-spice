#!/usr/bin/env perl

use strict;
use warnings;
use utf8;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Emojipedia)],
    # Primary queries
    '😂 emojipedia' => test_spice(
        '/js/spice/emojipedia/%F0%9F%98%82',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    '😂 emoji' => test_spice(
        '/js/spice/emojipedia/%F0%9F%98%82',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    '😂 meaning' => test_spice(
        '/js/spice/emojipedia/%F0%9F%98%82',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    'emojipedia 😂' => test_spice(
        '/js/spice/emojipedia/%F0%9F%98%82',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    "emojipedia \N{U+1F468}\N{U+1F3FD}" => test_spice(
        '/js/spice/emojipedia/%F0%9F%91%A8%F0%9F%8F%BD',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    "\N{U+1F1E6}\N{U+1F1F6} emoji" => test_spice(
        '/js/spice/emojipedia/%F0%9F%87%A6%F0%9F%87%B6',
        call_type => 'include',
        caller => 'DDG::Spice::Emojipedia'
    ),
    # Non-emoji matches
    'f emojipedia' => undef,
    'f emoji' => undef,
    'f meaning' => undef
);

done_testing;

