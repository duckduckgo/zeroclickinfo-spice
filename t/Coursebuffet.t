#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Coursebuffet )],
    'computer science course' => test_spice(
        '/js/spice/coursebuffet/standard/courses/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    ),
    'udacity computer science' => test_spice(
        '/js/spice/coursebuffet/provider/udacity/computer%20science',
        call_type => 'include',
        caller => 'DDG::Spice::Coursebuffet'
    )
);

done_testing;