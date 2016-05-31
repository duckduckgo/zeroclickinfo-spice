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
    # Non-emoji matches
    'f emojipedia' => undef,
    'f emoji' => undef,
    'f meaning' => undef
);

done_testing;

