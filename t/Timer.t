#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Timer'
    ],
    'timer' =>
        test_spice(
            '/js/spice/timer/', 
            call_type => 'include', #should be 'self' in real code
            caller => 'DDG::Spice::Timer'
        ),
	'blahblah timer' => undef,
    'online timer' =>
        test_spice(
            '/js/spice/timer/',
            call_type => 'include', #should be 'self' in real code
            caller => 'DDG::Spice::Timer'
        ),
    'timer online' =>
        test_spice(
            '/js/spice/timer/',
            call_type => 'include', #should be 'self' in real code
            caller => 'DDG::Spice::Timer'
        ),
);

done_testing;
