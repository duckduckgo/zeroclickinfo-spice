#!/usr/bin/env perl
use strict;
use warnings; 
use Test::More; 
use DDG::Test::Spice;
# These two modules are only necessary when testing with the Location API.
use DDG::Test::Location;
use DDG::Request; ddg_spice_test(
    [qw( DDG::Spice::GetEvents )],
    # This optional argument to ddg_goodie_test is a DDG::Request object. The object constructor takes two arguments of its own: the query (usually specified in the 
    # test_zci), and a location object - created by test_location (with a country code).
    DDG::Request->new(
        query_raw => "events near me",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/get_events/'
        .'51.2000/6.4333/Europe%2FBerlin',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents',
    ),
    # The DDG::Request is used in place of a query string, and isn't necessary to be used with every test passed to ddg_spice_test.
    'events near me' => test_spice(
        '/js/spice/get_events/40.1246/-75.5385/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents',
    ));
done_testing;
