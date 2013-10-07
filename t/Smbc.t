#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Smbc )],
    'smbc' => test_spice(
        '/js/spice/smbc/',
        caller => 'DDG::Spice::Smbc',
    ),
    'today\'s smbc' => test_spice(
        '/js/spice/smbc/',
        caller => 'DDG::Spice::Smbc',
    ),
    'todays smbc comic' => test_spice(
        '/js/spice/smbc/',
        caller => 'DDG::Spice::Smbc',
    ),
);

done_testing;

