#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubStatus )],
    'github status' => test_spice(
        '/js/spice/github_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::GithubStatus'
    ),
    'github system status' => test_spice(
        '/js/spice/github_status/system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::GithubStatus'
    ),
);

done_testing;
