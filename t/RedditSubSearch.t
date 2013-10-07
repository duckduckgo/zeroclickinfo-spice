#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditSubSearch )],
    '/r/duckduckgo' => test_spice(
        '/js/spice/reddit_sub_search/duckduckgo',
        caller => 'DDG::Spice::RedditSubSearch'
    ),
);

done_testing;

