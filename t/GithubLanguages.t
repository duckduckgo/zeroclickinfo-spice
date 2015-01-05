#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GithubLanguages)],
    'javascript redis' => test_spice(
        '/js/spice/github_languages/%20redis%20language%3Ajavascript',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'redis javascript' => test_spice(
        '/js/spice/github_languages/redis%20%20language%3Ajavascript',
        call_type => 'include',
        caller => 'DDG::Spice::GithubLanguages'
    ),
    'redis javascript client' => undef,
);

done_testing;

