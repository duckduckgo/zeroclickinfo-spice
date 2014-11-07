#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek )],
    'live show weezer' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'weezer live show' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'weezer live shows' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'live shows weezer' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'live weezer' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'weezer live' => test_spice(
        '/js/spice/seat_geek/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek'
    ),
    'upcoming concerts in flames' => test_spice(
        '/js/spice/seat_geek/in-flames',
        caller => 'DDG::Spice::SeatGeek',
    ),
    'In Flames upcoming concerts' => test_spice(
        '/js/spice/seat_geek/in-flames',
        caller => 'DDG::Spice::SeatGeek',
    ),
    'concert in flames' => test_spice(
        '/js/spice/seat_geek/in-flames',
        caller => 'DDG::Spice::SeatGeek',
    ),
    'in flames concert' => test_spice(
        '/js/spice/seat_geek/in-flames',
        caller => 'DDG::Spice::SeatGeek',
    ),
);

done_testing;