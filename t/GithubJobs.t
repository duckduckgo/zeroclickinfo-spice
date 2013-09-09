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
    'python jobs remote' => test_spice(
	'/js/spice/github_jobs/python-remote',
	call_type = > 'include',
	caller => 'DDG::Spice::GithubJobs'
    ),
    'support engineer jobs san jose' => test_spice(
	'/js/spice/github_jobs/python-remote',
	call_type = > 'include',
	caller => 'DDG::Spice::GithubJobs'
    ),
    'ror jobs la' => test_spice(
	'/js/spice/github_jobs/python-remote',
	call_type = > 'include',
	caller => 'DDG::Spice::GithubJobs'
    ),
    'node.js jobs london' => test_spice(
	'/js/spice/github_jobs/python-remote',
	call_type = > 'include',
	caller => 'DDG::Spice::GithubJobs'
    ),
    'django jobs munich' => test_spice(
	'/js/spice/github_jobs/python-remote',
	call_type = > 'include',
	caller => 'DDG::Spice::GithubJobs'
    ),

);

done_testing;

