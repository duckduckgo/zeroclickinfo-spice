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

    'plumbers near me' => test_spice(
        '/js/spice/thumbtack/plumbers/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'electricians close by' => test_spice(
        '/js/spice/thumbtack/electricians/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'nearby hOuSe CLEANERS' => test_spice(
        '/js/spice/thumbtack/house-cleaners/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'NEARBY hOuSe CLEANERS' => test_spice(
        '/js/spice/thumbtack/house-cleaners/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'Bouncy house rentals around me' => test_spice(
        '/js/spice/thumbtack/bouncy-house-rentals/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),

    # Ensure no support outside the US.
    # ..well, at least for Germany.
    DDG::Request->new(
        query_raw => 'plumbers near me',
        location => test_location('de')
    ) => undef,

    'house cleaners close to me' => undef,
    'San Francisco plumbers' => undef,
    'hOuSe nearby CLEANERS' => undef
);

done_testing;

