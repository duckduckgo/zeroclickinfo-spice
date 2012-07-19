#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditSubSearch )],
    'what redditsubsearch with duck' => test_spice(
        '/js/spice/reddit_sub_search/duck',
        call_type => 'include',
        caller => 'DDG::Spice::RedditSubSearch'
    ),
);

done_testing;

