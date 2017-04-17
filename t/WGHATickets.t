#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::WGHATickets )],
    DDG::Request->new(
        query_raw => "was kostet max mutzke an der abendkasse in berlin",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wghatickets/was%20kostet%20max%20mutzke%20an%20der%20abendkasse%20in%20berlin%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHATickets',
    ),
    DDG::Request->new(
        query_raw => "karten oper",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wghatickets/karten%20oper%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHATickets',
    ),
    DDG::Request->new(
        query_raw => "eintrittskarten fc bayern",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wghatickets/eintrittskarten%20fc%20bayern%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHATickets',
    ),
    DDG::Request->new(
        query_raw => "konzert batschkapp in frankfurt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/wghatickets/konzert%20batschkapp%20in%20frankfurt%20M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::WGHATickets',
    ),
       DDG::Request->new(
        query_raw => "konzert batschkapp in frankfurt",
        location => test_location("us")
    ) => undef
);

done_testing;

