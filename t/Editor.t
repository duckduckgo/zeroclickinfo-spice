#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Editor )],
    'python web editor' => test_spice(
        'python',
        call_type => 'self',
        caller => 'DDG::Spice::Editor',
    ),
    'online editor python' => test_spice(
        'python',
        call_type => 'self',
        caller => 'DDG::Spice::Editor',
    ),
    'javascript web editor' => test_spice(
        'javascript',
        call_type => 'self',
        caller => 'DDG::Spice::Editor',
    ),
    'syntax highlighter javascript' => test_spice(
        'javascript',
        call_type => 'self',
        caller => 'DDG::Spice::Editor',
    ),
    'online editor JavaScript' => test_spice(
        'JavaScript',
        call_type => 'self',
        caller => 'DDG::Spice::Editor',
    ),
    'editor' => undef,
    'editor ruby' => undef,    
);

done_testing;

