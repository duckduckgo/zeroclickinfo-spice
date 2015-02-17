#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
        [qw(DDG::Spice::TreepHotels)],
        'hotels in amsterdam' => test_spice (
            '/js/spice/treep_hotels/amsterdam',
            call_type => 'include',
            caller => 'DDG::Spice::TreepHotels'
        ),
        'new york hotels' => test_spice (
            '/js/spice/treep_hotels/new%20york',
            call_type => 'include',
            caller => 'DDG::Spice::TreepHotels'
        ),
        'hotel in new york' => test_spice (
            '/js/spice/treep_hotels/new%20york',
            call_type => 'include',
            caller => 'DDG::Spice::TreepHotels'
        ),
        'new york hotels' => test_spice (
            '/js/spice/treep_hotels/new%20york',
            call_type => 'include',
            caller => 'DDG::Spice::TreepHotels'
        ),
        'bucharest city break' => test_spice (
            '/js/spice/treep_hotels/bucharest',
            call_type => 'include',
            caller => 'DDG::Spice::TreepHotels'
        )
);

done_testing;