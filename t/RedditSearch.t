#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditSearch )],
    'reddit duckduckgo' => test_spice(
        '/js/spice/reddit_search/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::RedditSearch'
    ),
    'reddit baking' => test_spice(
        '/js/spice/reddit_search/baking',
        caller    => 'DDG::Spice::RedditSearch',
    ),
);

done_testing;

