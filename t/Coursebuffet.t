#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Coursebuffet )],
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
    'computer science online course' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science%20online',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science online courses' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science%20online',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'online computer science course' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'online computer science courses' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science moocs' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'online computer science classes' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'online computer science class' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science coursera' => test_spice(
        '/js/spice/coursebuffet/provider/coursera/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'udacity computer science courses' => test_spice(
        '/js/spice/coursebuffet/provider/udacity/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'computer science class' => undef
);

done_testing;