#!/usr/bin/env perl
use open ':std', ':encoding(UTF-8)'; #prevent wide character warns
use utf8;
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw(DDG::Spice::Riffsy)],
    '👍' => test_spice(
        '/js/spice/riffsy/%F0%9F%91%8D',
        call_type => 'include',
        caller => 'DDG::Spice::Riffsy'
    ),
    '👍 gifs' => test_spice(
        '/js/spice/riffsy/%F0%9F%91%8D%20gifs',
        call_type => 'include',
        caller => 'DDG::Spice::Riffsy'
    ),
    '😍😍 gifs' => test_spice(
        '/js/spice/riffsy/%F0%9F%98%8D%F0%9F%98%8D%20gifs',
        call_type => 'include',
        caller => 'DDG::Spice::Riffsy'
    ),
    'dog gifs' => test_spice(
        '/js/spice/riffsy/dog%20gifs',
        call_type => 'include',
        caller => 'DDG::Spice::Riffsy'
    ),
    'cat gif' => test_spice(
        '/js/spice/riffsy/cat%20gif',
        call_type => 'include',
        caller => 'DDG::Spice::Riffsy'
    ),
    'lol' => undef,
    'a' => undef,
    'something random' => undef,
    '😍😍' => undef,
    '語' => undef,
    'Ф' => undef,
    'Σ' => undef,
);

done_testing;