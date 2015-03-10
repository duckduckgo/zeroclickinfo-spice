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
    'kids news' => test_spice(
        '/js/spice/dogo_news/kids%20news',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    ),
    'obama news for kids' => test_spice(
        '/js/spice/dogo_news/obama%20news%20for%20kids',
        call_type => 'include',
        caller => 'DDG::Spice::DogoNews'
    )
);

done_testing;

