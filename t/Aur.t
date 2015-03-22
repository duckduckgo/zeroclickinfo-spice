#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Aur)],
    'aur zsh' => test_spice(
        '/js/spice/aur/query',
        call_type => 'include',
        caller => 'DDG::Spice:Aur'
    )
);

done_testing;

