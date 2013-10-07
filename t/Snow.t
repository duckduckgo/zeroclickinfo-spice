#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# These two modules are only necessary when testing with the Location API.
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::Snow )],
    # This optional argument to ddg_goodie_test is a DDG::Request object.
    # The object constructor takes two arguments of its own:
    # the query (usually specified in the test_zci),
    # and a location object - created by test_location (with a country code).
    DDG::Request->new(
        query_raw => "is it snowing?",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/snow/'
        .'M%C3%B6nchengladbach%2C%20%20Nordrhein-Westfalen%2C%20%20Germany',
        caller => 'DDG::Spice::Snow',
    ),
    # The DDG::Request is used in place of a query string, and isn't necessary
    # to be used with every test passed to ddg_spice_test.
    'is it snowing in new york?' => test_spice(
    	'/js/spice/snow/new%20york',
    	caller => 'DDG::Spice::Snow',
    )
);

done_testing;

