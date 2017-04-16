#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GfyCat)],
    'gfycat scarygrizzledcomet' => test_spice(
        '/js/spice/gfy_cat/scarygrizzledcomet',
        call_type => 'include',
        caller => 'DDG::Spice::GfyCat'
    ),
    'gfy cat scarygrizzledcomet' => test_spice(
        '/js/spice/gfy_cat/scarygrizzledcomet',
        call_type => 'include',
        caller => 'DDG::Spice::GfyCat'
    ),
    'gfy scarygrizzledcomet' => test_spice(
        '/js/spice/gfy_cat/scarygrizzledcomet',
        call_type => 'include',
        caller => 'DDG::Spice::GfyCat'
    ),
    'scarygrizzledcomet gfy cat' => test_spice(
        '/js/spice/gfy_cat/scarygrizzledcomet',
        call_type => 'include',
        caller => 'DDG::Spice::GfyCat'
    ),
    'gfy cat ' => undef,
    'gfycat ' => undef,
    'gfy ' => undef,
);

done_testing;

