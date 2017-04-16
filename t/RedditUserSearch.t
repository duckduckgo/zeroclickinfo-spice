#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RedditUserSearch )],
    'reddit user alienth' => test_spice(
        '/js/spice/reddit_user_search/alienth',
        caller    => 'DDG::Spice::RedditUserSearch',
    ),
    
        'reddit user reddit' => test_spice(
        '/js/spice/reddit_user_search/reddit',
        caller    => 'DDG::Spice::RedditUserSearch',
    ),

    'alienth' => undef, # No results for a username without 'reddit user' trigger
);

done_testing;
