#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::InstantAnswersIndex )],
    'list of ddg instant answers' => test_spice(
        '/js/spice/instant_answers_index/list%20of',
        call_type => 'include',
        caller => 'DDG::Spice::InstantAnswersIndex',
    ),
    'list of duckduckgo instant answers' => test_spice(
        '/js/spice/instant_answers_index/list%20of',
        call_type => 'include',
        caller => 'DDG::Spice::InstantAnswersIndex',
    ),
    'ddg instant answers list' => test_spice(
        '/js/spice/instant_answers_index/list',
        call_type => 'include',
        caller => 'DDG::Spice::InstantAnswersIndex',
    ),
        'list all ddg instant answers' => test_spice(
        '/js/spice/instant_answers_index/list%20all',
        call_type => 'include',
        caller => 'DDG::Spice::InstantAnswersIndex',
    ),
        'full list of duckduckgo instant answers' => test_spice(
        '/js/spice/instant_answers_index/full%20list%20of',
        call_type => 'include',
        caller => 'DDG::Spice::InstantAnswersIndex',
    ),
);

done_testing;
