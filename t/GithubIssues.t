#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::GithubIssues)],
    'github issue rails invalid authenticity ruby' => test_spice(
        '/js/spice/github_issues/rails%20invalid%20authenticity%20language%3A%22ruby%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubIssues'
    ),
    'github issue rails invalid authenticity' => test_spice(
        '/js/spice/github_issues/rails%20invalid%20authenticity',
        call_type => 'include',
        caller => 'DDG::Spice::GithubIssues'
    ),
    'rails invalid authenticity github issue' => test_spice(
        '/js/spice/github_issues/rails%20invalid%20authenticity',
        call_type => 'include',
        caller => 'DDG::Spice::GithubIssues'
    ),
    'rails invalid authenticity ruby github issue' => test_spice(
        '/js/spice/github_issues/rails%20invalid%20authenticity%20language%3A%22ruby%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubIssues'
    ),
    'github jobs' => undef,
    'github repos' => undef,
    'github status' => undef
);

done_testing;

