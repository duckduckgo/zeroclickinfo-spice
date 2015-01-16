#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek::Events )],
    'live show weezer' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'weezer live show' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'weezer live shows' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'live shows weezer' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'live weezer' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'weezer live' => test_spice(
        '/js/spice/seat_geek/events/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::Events'
    ),
    'upcoming concerts in flames' => test_spice(
        '/js/spice/seat_geek/events/in-flames',
        caller => 'DDG::Spice::SeatGeek::Events',
    ),
    'In Flames upcoming concerts' => test_spice(
        '/js/spice/seat_geek/events/in-flames',
        caller => 'DDG::Spice::SeatGeek::Events',
    ),
    'concert in flames' => test_spice(
        '/js/spice/seat_geek/events/in-flames',
        caller => 'DDG::Spice::SeatGeek::Events',
    ),
    'in flames concert' => test_spice(
        '/js/spice/seat_geek/events/in-flames',
        caller => 'DDG::Spice::SeatGeek::Events',
    ),
);

done_testing;
