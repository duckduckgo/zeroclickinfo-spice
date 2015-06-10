#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
# These two modules are only necessary when testing with the Location API.
use DDG::Test::Location;
use DDG::Request; 

ddg_spice_test(
    [qw( DDG::Spice::GetEvents::Nearby )],
    # This optional argument to ddg_goodie_test is a DDG::Request object. The object constructor takes two arguments of its own: the query (usually specified in the
    # test_zci), and a location object - created by test_location (with a country code).
    DDG::Request->new(
        query_raw => "events near me",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/get_events/nearby/'
        .'51.2000/6.4333/Europe%2FBerlin',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::Nearby',
    ),
    # The DDG::Request is used in place of a query string, and isn't necessary to be used with every test passed to ddg_spice_test.
    'events near me' => test_spice(
        '/js/spice/get_events/nearby/40.1246/-75.5385/America%2FNew_York',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::Nearby',
    ));
    
    
ddg_spice_test(
    [qw( DDG::Spice::GetEvents::City )],
    'events in london' => test_spice(
        '/js/spice/get_events/city/london',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::City'
    ),
    'what to do in new york' => test_spice(
        '/js/spice/get_events/city/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::City'
    ),
    'things to do in new york' => test_spice(
        '/js/spice/get_events/city/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::City'
    ),
    'new york things to do' => test_spice(
        '/js/spice/get_events/city/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::City'
    ),
        'toronto events' => test_spice(
        '/js/spice/get_events/city/toronto',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents::City'
    ),
);
done_testing;
