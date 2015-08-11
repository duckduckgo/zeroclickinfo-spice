#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::ClojurePackagesFromClojars)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'clojure instaparse' => test_spice(
        '/js/spice/clojure_packages_from_clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::ClojurePackagesFromClojars'
    ),
    'clojure lib instaparse' => test_spice(
    '/js/spice/clojure_packages_from_clojars/instaparse',
     call_type => 'include',
     caller => 'DDG::Spice::ClojurePackagesFromClojars'
    ),
    'clojure library instaparse' => test_spice(
    '/js/spice/clojure_packages_from_clojars/instaparse',
     call_type => 'include',
     caller => 'DDG::Spice::ClojurePackagesFromClojars'
    ),
    'clojars instaparse' => test_spice(
    '/js/spice/clojure_packages_from_clojars/instaparse',
     call_type => 'include',
     caller => 'DDG::Spice::ClojurePackagesFromClojars'
    )
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
  
);

done_testing;

