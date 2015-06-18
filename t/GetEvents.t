#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
    
    
ddg_spice_test(
    [qw( DDG::Spice::GetEvents )],
    'events in london' => test_spice(
        '/js/spice/get_events/london',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents'
    ),
    'what to do in new york' => test_spice(
        '/js/spice/get_events/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents'
    ),
    'things to do in new york' => test_spice(
        '/js/spice/get_events/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents'
    ),
    'new york things to do' => test_spice(
        '/js/spice/get_events/new%20york',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents'
    ),
        'toronto events' => test_spice(
        '/js/spice/get_events/toronto',
        call_type => 'include',
        caller => 'DDG::Spice::GetEvents'
    ),
);
done_testing;
