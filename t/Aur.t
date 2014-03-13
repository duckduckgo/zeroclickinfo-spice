#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Aur )],
    'aur powermate' => test_spice(
        '/js/spice/aur/powermate',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
    'archlinux package powermate' => test_spice(
        '/js/spice/aur/powermate',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
    'arch package powermate' => test_spice(
        '/js/spice/aur/powermate',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
    'archlinux package 9base-git' => test_spice(
        '/js/spice/aur/9base-git',
        caller    => 'DDG::Spice::Aur',
    ),
);

done_testing;

