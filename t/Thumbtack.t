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

    'Thumbtack movers' => test_spice(
        '/js/spice/thumbtack/thumbtack-movers/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'tHumbTack electricians close by' => test_spice(
        '/js/spice/thumbtack/thumbtack-electricians-close-by/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'Thumbtack cOMPUTer repair' => test_spice(
        '/js/spice/thumbtack/thumbtack-computer-repair/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),
    'thumbtack piano lessons' => test_spice(
        '/js/spice/thumbtack/thumbtack-piano-lessons/PA/Phoenixville',
        call_type => 'include',
        caller => 'DDG::Spice::Thumbtack'
    ),

    # Ensure no support outside the US.
    # ..well, at least for Germany.
    DDG::Request->new(
        query_raw => 'thumbtack plumbers',
        location => test_location('de')
    ) => undef,

    'thumbtack life coaches' => undef,
    'San Francisco plumbers' => undef,
    'computer nearby repair' => undef
);

done_testing;

