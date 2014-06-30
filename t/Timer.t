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
    'tv show timer' => undef,
    'online countdown timer' =>
        test_spice(
            '',
            call_type => 'self', 
            caller => 'DDG::Spice::Timer'
        ),
);

done_testing;
