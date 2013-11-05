#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Songkick::Artists DDG::Spice::Songkick::Events )],
    'artists like Bob Marley' => test_spice(
        '/js/spice/songkick/artists/Bob%20Marley',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Artists',
    ),
    'artists similar to Jonny Lang' => test_spice(
        '/js/spice/songkick/artists/Jonny%20Lang',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Artists',
    ),
    'concerts around New York City' => test_spice(
        '/js/spice/songkick/events/New%20York%20City',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Events',
    ),
    'concerts in Boston' => test_spice(
        '/js/spice/songkick/events/Boston',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Events',
    ),
    'concerts near Princeton' => test_spice(
        '/js/spice/songkick/events/Princeton',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Events',
    )
);

done_testing;

