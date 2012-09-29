#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditSearch )],
    'reddit duckduckgo' => test_spice(
        '/js/spice/reddit_search/duckduckgo/duckduckgo/false',
        call_type => 'include',
        caller => 'DDG::Spice::RedditSearch'
    ),
);

done_testing;

