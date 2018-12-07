#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SublimePackages )],
    
    # Basic tests
    'sublimetext package code' => test_spice(
        '/js/spice/sublime_packages/code',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublime text php' => test_spice(
        '/js/spice/sublime_packages/php',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublime text package for json' => test_spice(
        '/js/spice/sublime_packages/json',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    
    # Operating system filtering tests
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
    
    'sublimetext package auto osx' => test_spice(
        '/js/spice/sublime_packages/auto%20%3Aosx',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublime text package javascript win' => test_spice(
        '/js/spice/sublime_packages/javascript%20%3Awin',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    
    # Version filtering tests
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
    
    'sublime text 2 yml' => test_spice(
        '/js/spice/sublime_packages/%3Ast2%20yml',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'sublime text v3 yml' => test_spice(
        '/js/spice/sublime_packages/%3Ast3%20yml',
        call_type => 'include',
        caller => 'DDG::Spice::SublimePackages'
    ),
    
    'about sublime text' => undef,
    'sublimetext download' => undef,

    # Skip word triggers
    'sublime text download' => undef,
    'sublime text purchase' => undef,
    'sublime text buy' => undef,
    'sublime text about' => undef,
    #Additional tests added
    'sublime text alternatives to mac' => undef,
    'sublime text alternatives to windows' => undef,
    'sublime text alternative to mac' => undef,
    'sublime text alternative to anything' => undef
);

done_testing;

