#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [
        'DDG::Spice::Aur'
    ],
    'aur zsh' => test_spice(
        '/js/spice/aur/zsh',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
    'Arch Package ssh' => test_spice(
        '/js/spice/aur/ssh',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
);

done_testing;

