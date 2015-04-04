#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SublimePackages )],
    'sublimetext package code' => test_spice(
        '/js/spice/sublime_packages/code',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    'sublime text package php' => test_spice(
        '/js/spice/sublime_packages/php',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'about sublime text' => undef,
    'sublimetext download' => undef
);

done_testing;

