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
    'test c++' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22c%2B%2B%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'c++ test' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22c%2B%2B%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'f# test' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22f%23%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'test f#' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22f%23%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'graphviz (dot) test' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22graphviz%20%28dot%29%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'test graphviz (dot)' => test_spice(
        '/js/spice/github_languages/test%20language%3A%22graphviz%20%28dot%29%22',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'redis javascript client' => undef,
);

done_testing;

