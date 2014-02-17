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
            '/js/spice/stopwatch/', 
            call_type => 'include', #should be 'self' in real code
            caller => 'DDG::Spice::Stopwatch'
        ),
	'blahblah stopwatch' => undef, 
);

done_testing;
