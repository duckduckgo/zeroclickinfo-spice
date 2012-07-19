#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::HackerNews )],
    'what hackernews with duck' => test_spice(
        '/js/spice/hacker_news/duck',
        call_type => 'include',
        caller => 'DDG::Spice::HackerNews'
    ),
);

done_testing;

