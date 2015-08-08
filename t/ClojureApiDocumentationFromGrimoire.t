#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::ClojureApiDocumentationFromGrimoire)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'clojure doseq' => test_spice(
        '/js/spice/clojure_api_documentation_from_grimoire/clojure.core%2Fdoseq',
        call_type => 'include',
        caller => 'DDG::Spice::ClojureApiDocumentationFromGrimoire'
    ),
    'clojure clojure.zip/zipper' => test_spice(
        '/js/spice/clojure_api_documentation_from_grimoire/clojure.zip%2Fzipper',
        call_type => 'include',
        caller => 'DDG::Spice::ClojureApiDocumentationFromGrimoire'
    )    
);

done_testing;

