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
            '', 
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
	'blahblah timer' => undef,
    'online timer' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
    'timer online' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
    '1 minute timer' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
    '2min30sec online timer' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
    '3 hr 5 min timer' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
    'timer 30 seconds' =>
        test_spice(
            '',
            call_type => 'self',
            caller => 'DDG::Spice::Timer'
        ),
);

done_testing;
