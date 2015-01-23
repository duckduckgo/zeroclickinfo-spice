#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubLanguages)],
    'javascript test' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22javascript%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'test javascript' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22javascript%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'redis javascript client' => undef,
);

done_testing;

