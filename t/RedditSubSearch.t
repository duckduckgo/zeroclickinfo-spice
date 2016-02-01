#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditSubSearch )],
    '/r/duckduckgo' => test_spice(
        '/js/spice/reddit_sub_search/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::RedditSubSearch'
    ),
    'subreddit pizza' => test_spice(
        '/js/spice/reddit_sub_search/pizza',
        caller    => 'DDG::Spice::RedditSubSearch',
    ),
    '/r/games' => test_spice(
        '/js/spice/reddit_sub_search/games',
        caller    => 'DDG::Spice::RedditSubSearch',
    ),
    'r/accounting' => test_spice(
        '/js/spice/reddit_sub_search/accounting',
        caller    => 'DDG::Spice::RedditSubSearch',
    ),
);

done_testing;

