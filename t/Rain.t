#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# These two modules are only necessary when testing with the Location API.
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::Rain )],
    # This optional argument to ddg_goodie_test is a DDG::Request object.
    # The object constructor takes two arguments of its own:
    # the query (usually specified in the test_zci),
    # and a location object - created by test_location (with a country code).
    DDG::Request->new(
        query_raw => "is it raining?",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/rain/'
        .'M%C3%B6nchengladbach%2CNordrhein-Westfalen%2CGermany',
        call_type => 'include',
        caller => 'DDG::Spice::Rain',
        is_cached => 0
    ),
    # The DDG::Request is used in place of a query string, and isn't necessary
    # to be used with every test passed to ddg_spice_test.
    'is it raining in new york?' => test_spice(
    	'/js/spice/rain/new%20york',
    	call_type => 'include',
    	caller => 'DDG::Spice::Rain',
    ),
    'is it raining in new york city?' => test_spice(
    	'/js/spice/rain/new%20york%20city',
    	call_type => 'include',
    	caller => 'DDG::Spice::Rain',
    )
);

done_testing;

