#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SentimentAnalysis::Document)],
    'sentiment analysis www.twitter.com/gpestana/status/671686066978557952' => test_spice(
        '/js/spice/sentiment_analysis/document/www.twitter.com%2Fgpestana%2Fstatus%2F671686066978557952',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis::Document'
    ),
    'sentiment of github.com/duckduckgo' => test_spice(
        '/js/spice/sentiment_analysis/document/github.com%2Fduckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis::Document'
    ),
    'sa https://duck.co' => test_spice(
        '/js/spice/sentiment_analysis/document/https%3A%2F%2Fduck.co',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis::Document'
    ),
    'sentiment of sometext here github.com/duckduckgo another text here' => test_spice(
        '/js/spice/sentiment_analysis/document/github.com%2Fduckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::SentimentAnalysis::Document'
    ),
    'sentiment of this is not a link, so it should not work (for now)' => undef,
    'sentiments' => undef,
    'SAS' => undef,
);

done_testing;

