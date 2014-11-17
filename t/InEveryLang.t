#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::InEveryLang)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'Hello, World! in C++' => test_spice(
        '/js/spice/in_every_lang/hello-world',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    'FizzBuzz in Swift' => test_spice(
        '/js/spice/in_every_lang/fizz-buzz',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    'Fizz Buzz in Swift' => test_spice(
        '/js/spice/in_every_lang/fizz-buzz',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'code puzzles' => undef,
    'c# katas' => undef,
    'Hello in C' => undef
    
);

done_testing;

