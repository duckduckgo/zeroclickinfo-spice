#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoNews )],
    'dogonews' => test_spice(
        '/js/spice/dogo_news/dogonews',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'dogo news' => test_spice(
        '/js/spice/dogo_news/dogo%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids news' => test_spice(
        '/js/spice/dogo_news/kids%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids newspaper' => test_spice(
        '/js/spice/dogo_news/kids%20newspaper',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science kids news articles' => test_spice(
        '/js/spice/dogo_news/science%20kids%20news%20articles',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids current events' => test_spice(
        '/js/spice/dogo_news/kids%20current%20events',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids current event' => test_spice(
        '/js/spice/dogo_news/kids%20current%20event',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids current events' => test_spice(
        '/js/spice/dogo_news/kids%20current%20events',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'obama news for kids' => test_spice(
        '/js/spice/dogo_news/obama%20news%20for%20kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science news for kids' => test_spice(
        '/js/spice/dogo_news/science%20news%20for%20kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science news for children' => test_spice(
        '/js/spice/dogo_news/science%20news%20for%20children',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science news for students' => test_spice(
        '/js/spice/dogo_news/science%20news%20for%20students',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids science news' => test_spice(
        '/js/spice/dogo_news/kids%20science%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'childrens science news' => test_spice(
        '/js/spice/dogo_news/childrens%20science%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'children\'s science news' => test_spice(
        '/js/spice/dogo_news/children%27s%20science%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'students science news' => test_spice(
        '/js/spice/dogo_news/students%20science%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    )
);

done_testing;

