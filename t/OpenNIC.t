#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# Location test
use DDG::Test::Location;
use DDG::Request;
spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::OpenNIC)],
    # basic queries
    DDG::Request->new(
        query_raw => "opennic",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/40.1246/-75.5385/all/',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
    DDG::Request->new(
        query_raw => "neutral dns",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/40.1246/-75.5385/all/',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
    DDG::Request->new(
        query_raw => "censor-free dns",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/40.1246/-75.5385/all/',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
    
    # queries with parameters
        # ip for detection
    DDG::Request->new(
        query_raw => "opennic 42.42.42.42",
        location => test_location("us")
    ) => test_spice( 
        '/js/spice/open_nic/US/0/0/all/42.42.42.42',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
        # ipv4 addresses only
    DDG::Request->new(
        query_raw => "opennic ipv4",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/40.1246/-75.5385/4/',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
    
        # ipv6 addresses only
    DDG::Request->new(
        query_raw => "opennic ipv6",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/40.1246/-75.5385/6/',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
    
    # queries with multiple parameters
    DDG::Request->new(
        query_raw => "opennic ipv6 42.42.42.42",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/open_nic/US/0/0/6/42.42.42.42',
        call_type => 'include',
        caller => 'DDG::Spice::OpenNIC'
    ),
);

done_testing;

