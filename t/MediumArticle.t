#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::MediumArticle)],
    'medium.com rails okta' => test_spice(
        '/js/spice/medium_article/rails%20okta',
        call_type => 'include',
        caller => 'DDG::Spice::MediumArticle'
    ),
    'medium article golang' => test_spice(
        '/js/spice/medium_article/golang',
        call_type => 'include',
        caller => 'DDG::Spice::MediumArticle'
    ),
    'medium.com article rails okta' => test_spice(
        '/js/spice/medium_article/rails%20okta',
        call_type => 'include',
        caller => 'DDG::Spice::MediumArticle'
    ),
    'medium rails okta' => test_spice(
        '/js/spice/medium_article/rails%20okta',
        call_type => 'include',
        caller => 'DDG::Spice::MediumArticle'
    ),
    'bad example query' => undef,
);

done_testing;

