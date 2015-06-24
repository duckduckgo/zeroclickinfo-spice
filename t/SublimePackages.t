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
    
    'sublime text package for json' => test_spice(
        '/js/spice/sublime_packages/json',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublimetext package html linux' => test_spice(
        '/js/spice/sublime_packages/html%20%3Alinux',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublimetext package javascript mac os x' => test_spice(
        '/js/spice/sublime_packages/javascript%20%3Aosx',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublimetext package text version 2' => test_spice(
        '/js/spice/sublime_packages/text%20%3Ast2',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublimetext package text version 3' => test_spice(
        '/js/spice/sublime_packages/text%20%3Ast3',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'about sublime text' => undef,
    'sublimetext download' => undef,

    # Skip word triggers
    'sublime text download' => undef,
    'sublime text purchase' => undef,
    'sublime text buy' => undef,
    'sublime text about' => undef
);

done_testing;

