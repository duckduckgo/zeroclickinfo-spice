#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Songkick::Getartistid DDG::Spice::Songkick::Artists DDG::Spice::Songkick::Geteventid DDG::Spice::Songkick::Events )],
    'artists like Bob Marley' => test_spice(
        '/js/spice/songkick/getartistid/Bob%20Marley',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Getartistid',
    ),
    'artists similar to Jonny Lang' => test_spice(
        '/js/spice/songkick/getartistid/Jonny%20Lang',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Getartistid',
    ),
    'concerts around New York City' => test_spice(
        '/js/spice/songkick/geteventid/New%20York%20City',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Geteventid',
    ),
    'concerts in Boston' => test_spice(
        '/js/spice/songkick/geteventid/Boston',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Geteventid',
    ),
    'concerts near Princeton' => test_spice(
        '/js/spice/songkick/geteventid/Princeton',
        call_type => 'include',
        caller => 'DDG::Spice::Songkick::Geteventid',
    )
);

done_testing;

