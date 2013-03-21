#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

ddg_spice_test(
    [qw( DDG::Spice::IsItUp )],
    'is duckduckgo.com up?' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
        is_cached => 0
    ),
    'is føtex.dk up?' => test_spice(
        '/js/spice/is_it_up/f%C3%B8tex.dk',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
        is_cached => 0
    ),
);

done_testing;

