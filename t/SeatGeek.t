#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek::EventsByArtist )],
    'live show weezer' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'weezer live show' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'weezer live shows' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'live shows weezer' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'live weezer' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'weezer live' => test_spice(
        '/js/spice/seat_geek/events_by_artist/weezer',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist'
    ),
    'upcoming concerts beastie boys' => test_spice(
        '/js/spice/seat_geek/events_by_artist/beastie-boys',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist',
    ),
    'Beastie Boys upcoming concerts' => test_spice(
        '/js/spice/seat_geek/events_by_artist/beastie-boys',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist',
    ),
    'concert beastie boys' => test_spice(
        '/js/spice/seat_geek/events_by_artist/beastie-boys',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist',
    ),
    'beastie boys concert' => test_spice(
        '/js/spice/seat_geek/events_by_artist/beastie-boys',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist',
    ),
    'upcoming beastie boys concert' => test_spice(
        '/js/spice/seat_geek/events_by_artist/beastie-boys',
        caller => 'DDG::Spice::SeatGeek::EventsByArtist',
    ),
);

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek::EventsByVenue )],
    'live shows at cafe oto' => test_spice(
        '/js/spice/seat_geek/events_by_venue/cafe-oto',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByVenue'
    ),
    'shows at cafe oto' => test_spice(
        '/js/spice/seat_geek/events_by_venue/cafe-oto',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByVenue'
    ),
    'concerts at cafe oto' => test_spice(
        '/js/spice/seat_geek/events_by_venue/cafe-oto',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByVenue'
    ),
    'upcoming concerts at cafe oto' => test_spice(
        '/js/spice/seat_geek/events_by_venue/cafe-oto',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByVenue'
    ),
);

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek::EventsByCity )],
    'live shows in london' => test_spice(
        '/js/spice/seat_geek/events_by_city/london',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByCity'
    ),
    'shows in new york' => test_spice(
        '/js/spice/seat_geek/events_by_city/new-york',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByCity'
    ),
    'concerts in new york' => test_spice(
        '/js/spice/seat_geek/events_by_city/new-york',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByCity'
    ),
    'upcoming concerts in new york' => test_spice(
        '/js/spice/seat_geek/events_by_city/new-york',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsByCity'
    ),
);

ddg_spice_test(
    [qw( DDG::Spice::SeatGeek::EventsNearMe )],
    DDG::Request->new(
        query_raw => "live shows in my area",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/seat_geek/events_near_me/51.2000/6.4333',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsNearMe',
        is_cached => 0
    ),
    DDG::Request->new(
        query_raw => "upcoming concerts in my area",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/seat_geek/events_near_me/51.2000/6.4333',
        call_type => 'include',
        caller => 'DDG::Spice::SeatGeek::EventsNearMe',
        is_cached => 0
    ),
);

done_testing;
