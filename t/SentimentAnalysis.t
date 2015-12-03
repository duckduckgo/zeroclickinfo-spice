#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SentimentAnalysis)],
    'sentiment analysis www.twitter.com/gpestana/status/671686066978557952' => test_spice(
        '/js/spice/sentiment_analysis/www.twitter.com%2Fgpestana%2Fstatus%2F671686066978557952',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis'
    ),
    'sentiment of github.com/duckduckgo' => test_spice(
        '/js/spice/sentiment_analysis/github.com%2Fduckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis'
    ),
    'sa https://duck.co' => test_spice(
        '/js/spice/sentiment_analysis/https%3A%2F%2Fduck.co',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis'
    ),
    'sentiments' => undef,
    'SAS' => undef,
);

done_testing;

