#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Repl)],

    'python repl' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'python repl online' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'online python repl' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'c++ repl' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'repl python' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'python interpreter' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'python interpreter online' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'online python interpreter' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'c++ interpreter' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'interpreter python' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Repl'
    ),

    'perl repl' => undef,
    'perl interpreter' => undef,
);

done_testing;
