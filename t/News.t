#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::News )],
    'obama news' => test_spice(
        '/js/spice/news/obama%20news',
        call_type => 'include',
        caller => 'DDG::Spice::News'
    ),
    'duckduckgo news' => test_spice(
        '/js/spice/news/duckduckgo%20news',
        caller    => 'DDG::Spice::News',
    ),
    'government shutdown news' => test_spice(
        '/js/spice/news/government%20shutdown%20news',
        caller    => 'DDG::Spice::News',
    ),
);

done_testing;
