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
    'Quine in C++' => test_spice(
        '/js/spice/in_every_lang/quine/C%2B%2B',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    'FizzBuzz in Swift' => test_spice(
        '/js/spice/in_every_lang/fizz-buzz/Swift',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    'Fizz Buzz in Swift' => test_spice(
        '/js/spice/in_every_lang/fizz-buzz/Swift',
        call_type => 'include',
        caller => 'DDG::Spice::InEveryLang'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'Fizz Buzz' => undef,
    'Fizz Buzz in AFakeLanguage' => undef,
    'what is Fizz Buzz' => undef,
    'Fizz Buzz example' => undef,
    'code puzzles' => undef,
    'c# katas' => undef,
    'Hello in C' => undef
    
);

done_testing;

