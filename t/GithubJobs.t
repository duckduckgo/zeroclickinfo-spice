#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubJobs )],
    'what githubjobs with duck' => test_spice(
        '/js/spice/github_jobs/duck',
        call_type => 'include',
        caller => 'DDG::Spice::GithubJobs'
    ),
);

done_testing;

