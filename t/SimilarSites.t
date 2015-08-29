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
    'websites similar to facebook.com' => test_spice(
        '/js/spice/similar_sites/facebook.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    # should assume .com if no tld is present
    'websites similar to facebook' => test_spice(
        '/js/spice/similar_sites/facebook.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    # ignore all the spaces
    'similar websites to duck duck go' => test_spice(
        '/js/spice/similar_sites/duckduckgo.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'similar websites to https://www.facebook.com' => test_spice(
        '/js/spice/similar_sites/www.facebook.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'https://www.facebook.com similar websites' => test_spice(
        '/js/spice/similar_sites/www.facebook.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'similar sites to http://github.com' => test_spice(
        '/js/spice/similar_sites/github.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'websites like https://twitter.com' => test_spice(
        '/js/spice/similar_sites/twitter.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'website like https://twitter.com' => test_spice(
        '/js/spice/similar_sites/twitter.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'similar sites to like.com' => test_spice(
        '/js/spice/similar_sites/like.com',
        caller => 'DDG::Spice::SimilarSites'
    ),
    'similar to github.com' => test_spice(
        '/js/spice/similar_sites/github.com',
        caller => 'DDG::Spice::SimilarSites'
    )
);

done_testing;
