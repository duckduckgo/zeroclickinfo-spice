#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Coursebuffet )],
    'computer science online course' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science online courses' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science course online' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science courses online' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'udacity computer science' => test_spice(
        '/js/spice/coursebuffet/provider/udacity/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science harvard course' => undef,
    'main course' => undef
);

done_testing;