#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Syntax)],
    'syntax java for loop' => test_spice(
        '/js/spice/syntax/java%20for%20loop',
        call_type => 'include',
        caller => 'DDG::Spice::Syntax'
    ),
    # syntax trigger in the middle
    'java syntax for each' => test_spice(
        '/js/spice/syntax/java%20for%20each',
        call_type => 'include',
        caller => 'DDG::Spice::Syntax'
    ),
    # Concept without language
    'syntax for loop' => undef,
    # Language without concept
    'syntax java' => undef,
    # Syntax keyword by itself
    'syntax' => undef,
    # Syntax with garbage keywords
    'garbage syntax' => undef,
);

done_testing;

