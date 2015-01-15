#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::TravisStatus )],
    'travis status' => test_spice(
        '/js/spice/travis_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::TravisStatus'
    ),
    'travis system status' => test_spice(
        '/js/spice/travis_status/system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::TravisStatus'
    ),
    'is travis up' => test_spice(
        '/js/spice/travis_status/is%20up',
        call_type => 'include',
        caller => 'DDG::Spice::TravisStatus'
    ),
    'is travis up?' => test_spice(
        '/js/spice/travis_status/is%20up%3F',
        call_type => 'include',
        caller => 'DDG::Spice::TravisStatus'
    ),
    'travis ci status' => test_spice(
        '/js/spice/travis_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::TravisStatus'
    ),
    'travis' => undef
);

done_testing;
