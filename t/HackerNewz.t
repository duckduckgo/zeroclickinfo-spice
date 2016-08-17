#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::HackerNewz )],
    'hacker newz duckduckgo' => test_spice(
        '/js/spice/hacker_newz/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::HackerNewz'
    ),
    'hacker newz postgresql' => test_spice(
        '/js/spice/hacker_newz/postgresql',
        caller    => 'DDG::Spice::HackerNewz',
    ),
);

done_testing;
