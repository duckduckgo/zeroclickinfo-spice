#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::EventsInSpace)],

    "space events" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "space calendar" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "launch calendar " => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "space launch calendar " => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "upcoming launches" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "upcoming space launches" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "launch schedule" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "NASA schedule" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "NASA calendar" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "NASA events" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "ESA schedule" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "ESA calendar" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
    "ESA events" => test_spice(
        "/js/spice/events_in_space/",
        call_type => "include",
        caller => "DDG::Spice::EventsInSpace"
    ),
);

done_testing;
