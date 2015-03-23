#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SimilarSites )],
    'sites like facebook.com' => test_spice(
        '/js/spice/similar_sites/facebook.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'similar sites to github.com' => test_spice(
        '/js/spice/similar_sites/github.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'websites like twitter.com' => test_spice(
        '/js/spice/similar_sites/twitter.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
);

done_testing;
