#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Homebrew )],
    'brew wget' => test_spice(
        '/js/spice/homebrew/wget',
        call_type => 'include',
        caller => 'DDG::Spice::Homebrew',
        is_cached => 1
    ),
    'brew install wget' => test_spice(
        '/js/spice/homebrew/wget',
        call_type => 'include',
        caller => 'DDG::Spice::Homebrew',
        is_cached => 1
    ),
    'homebrew wget' => test_spice(
        '/js/spice/homebrew/wget',
        call_type => 'include',
        caller => 'DDG::Spice::Homebrew',
        is_cached => 1
    ),
    'wget brew' => test_spice(
        '/js/spice/homebrew/wget',
        call_type => 'include',
        caller => 'DDG::Spice::Homebrew',
        is_cached => 1
    ),
    'wget homebrew' => test_spice(
        '/js/spice/homebrew/wget',
        call_type => 'include',
        caller => 'DDG::Spice::Homebrew',
        is_cached => 1
    )
);

done_testing;
