#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubJobs )],
    'perl jobs in nyc' => test_spice(
        '/js/spice/github_jobs/perl-nyc',
        call_type => 'include',
        caller => 'DDG::Spice::GithubJobs'
    ),
    'javascript jobs' => test_spice(
        '/js/spice/github_jobs/javascript-',
        caller    => 'DDG::Spice::GithubJobs',
    ),
    'perl jobs in san francisco' => test_spice(
        '/js/spice/github_jobs/perl-san%20francisco',
        caller    => 'DDG::Spice::GithubJobs',
    ),
);

done_testing;

