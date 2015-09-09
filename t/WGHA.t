#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::WGHA )],
    DDG::Request->new(
        query_raw => "was geht heute ab in frankfurt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/was%20geht%20heute%20ab%20in%20frankfurt',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "party in frankfurt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/party%20in%20frankfurt',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "ausgehen in berlin",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/ausgehen%20in%20berlin',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "tanzen in darmstadt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/tanzen%20in%20darmstadt',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "was geht in berlin",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/was%20geht%20in%20berlin',
        caller    => 'DDG::Spice::WGHA',
    ),
      DDG::Request->new(
        query_raw => "was geht in berlin",
        location => test_location("us")
    ) => test_spice(
        '/js/spice/wgha/was%20geht%20in%20berlin',
        caller    => 'DDG::Spice::WGHA',
    ),
       DDG::Request->new(
        query_raw => "was geht in potsdam",
        location => test_location("us")
    ) => undef
);

done_testing;

