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
        '/js/spice/wgha/was%20geht%20heute%20ab%20in%20frankfurt%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "ausgehen in berlin",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/ausgehen%20in%20berlin%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "tanzen in darmstadt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wgha/tanzen%20in%20darmstadt%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHA',
    ),
    DDG::Request->new(
        query_raw => "was geht",
        location => test_location("de")
    )  => undef,
    DDG::Request->new(
        query_raw => "was geht in berlin",
        location => test_location("us")
    )  => undef,
    DDG::Request->new(
        query_raw => "was geht in potsdam",
        location => test_location("us")
    )  => undef,
    DDG::Request->new(
        query_raw => "party in frankfurt",
        location => test_location("de")
    )  => undef,
    DDG::Request->new(
        query_raw => "world party",
        location => test_location("de")
    )  => undef,
    DDG::Request->new(
        query_raw => "party disco berlin",
        location => test_location("de")
    )  => undef,
);

done_testing;

