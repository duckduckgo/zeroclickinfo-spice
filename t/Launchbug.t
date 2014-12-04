#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw(DDG::Spice::Launchbug)],

    'launchbug 1' => test_spice(
        '/js/spice/launchbug/1',
        call_type => 'include',
        caller => 'DDG::Spice::Launchbug'
    ),

    'launchbug 4r5' => undef,
);

done_testing;

