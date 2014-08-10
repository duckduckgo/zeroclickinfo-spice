#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubStatus ), qw( DDG::Spice::Github )],
    'github status' => test_spice(
        '/js/spice/github_status/',
        call_type => 'include',
        caller => 'DDG::Spice::GithubStatus'
    ),
    'github status foo' => test_spice(
        '/js/spice/github/status%20foo',
        call_type => 'include',
        caller => 'DDG::Spice::Github'
    ),
);

done_testing;

