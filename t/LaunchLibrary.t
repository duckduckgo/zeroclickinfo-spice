#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::LaunchLibrary)],
    'upcoming rocket launches' => test_spice(
        '/js/spice/launch_library/1',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchLibrary',
        is_cached => 1
    ),
    'next space launch' => test_spice(
        '/js/spice/launch_library/1',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchLibrary',
        is_cached => 1
    ),
    'rocket raccoon' => undef,
    'myspace launch party' => undef,
);

done_testing;

