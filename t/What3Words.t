#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::What3Words)],
    'what3words veal.notion.loses' => test_spice(
        '/js/spice/what3words/forward/addr/veal.notion.loses',
        call_type => 'include',
        caller => 'DDG::Spice::What3Words'
    ),
    '///veal.notion.loses' => test_spice(
        '/js/spice/what3words/forward/addr/veal.notion.loses',
        call_type => 'include',
        caller => 'DDG::Spice::What3Words'
    ),
    'what three words veal.notion.loses' => test_spice(
        '/js/spice/what3words/forward/addr/veal.notion.loses',
        call_type => 'include',
        caller => 'DDG::Spice::What3Words'
    ),
    'w3w veal.notion.loses' => test_spice(
        '/js/spice/what3words/forward/addr/veal.notion.loses',
        call_type => 'include',
        caller => 'DDG::Spice::What3Words'
    ),
    'w3w 40.74845, -73.985643' => test_spice(
        '/js/spice/what3words/reverse/coords/40.74845%2C-73.985643',
        call_type => 'include',
        caller => 'DDG::Spice::What3Words'
    ),

    'what3words veal notion loses' => undef,
    'w3w Empire State Building, New York' => undef,
    'www.facebook.com' => undef,
    'images.facebook.com' => undef,
    'veal.notion.loses' => undef
);

done_testing;
