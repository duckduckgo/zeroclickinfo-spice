#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoNews )],
    'dogonews' => test_spice(
        '/js/spice/dogo_news/latest',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'dogo news' => test_spice(
        '/js/spice/dogo_news/latest',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids news' => test_spice(
        '/js/spice/dogo_news/news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids newspaper' => test_spice(
        '/js/spice/dogo_news/newspaper',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science articles' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids current events' => test_spice(
        '/js/spice/dogo_news/current%20events',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'current event' => test_spice(
        '/js/spice/dogo_news/latest',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'current events' => test_spice(
        '/js/spice/dogo_news/latest',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'obama news for kids' => test_spice(
        '/js/spice/dogo_news/obama%20for%20kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science for kids' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science for children' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'science for students' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'kids science' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'childrens science' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'children\'s science' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'students science' => test_spice(
        '/js/spice/dogo_news/science',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    )
);

done_testing;

