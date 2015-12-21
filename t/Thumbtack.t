#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Thumbtack)],

    'movers near me' => test_spice(
        '/js/spice/thumbtack/movers-near-me/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'electricians close by' => test_spice(
        '/js/spice/thumbtack/electricians-close-by/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'nearby cOMPUTer repair' => test_spice(
        '/js/spice/thumbtack/nearby-computer-repair/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'piano lessons around me' => test_spice(
        '/js/spice/thumbtack/piano-lessons-around-me/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),

    # Ensure no support outside the US.
    # ..well, at least for Germany.
    DDG::Request->new(
        query_raw => 'plumbers near me',
        location => test_location('de')
    ) => undef,

    'life coaches close to me' => undef,
    'San Francisco plumbers' => undef,
    'computer nearby repair' => undef
);

done_testing;

