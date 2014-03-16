#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Editor )],
    'python editor' => test_spice(
        '/js/spice/editor/python',
        call_type => 'include',
        caller => 'DDG::Spice::Editor',
        
    ),
    'editor python' => test_spice(
        '/js/spice/editor/python',
        call_type => 'include',
        caller => 'DDG::Spice::Editor',
        
    ),
    'javascript editor' => test_spice(
        '/js/spice/editor/javascript',
        call_type => 'include',
        caller => 'DDG::Spice::Editor',
        
    ),
    'editor javascript' => test_spice(
        '/js/spice/editor/javascript',
        call_type => 'include',
        caller => 'DDG::Spice::Editor',
        
    ),
    'editor' => undef,
    'editor ruby' => undef,    
);

done_testing;

