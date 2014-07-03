#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Stopwatch'
    ],
    'stopwatch' =>
        test_spice(
            '', 
            call_type => 'self', #should be 'self' in real code
            caller => 'DDG::Spice::Stopwatch'
        ),
    'blahblah stopwatch' => undef,
    'online stop watch' =>
        test_spice(
            '',
            call_type => 'self', #should be 'self' in real code
            caller => 'DDG::Spice::Stopwatch'
        ),
    'stopwatch online' =>
        test_spice(
            '',
            call_type => 'self', #should be 'self' in real code
            caller => 'DDG::Spice::Stopwatch'
        ),
);

done_testing;
