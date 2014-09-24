#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::TflStatus'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    'victoria line status' => test_spice(
        # The first argument is the Spice callback. It includes the javascript
        # endpoint and the argument list contructed by the Perl code. In this
        # case, the endpoint is '/js/spice/tfl_status/', and the argument returned by
        # the Perl code is victoria.
        '/js/spice/tfl_status/victoria',
        # This is the Spice calltype. It's almost always set to 'include',
        # except for some special cases like FlashVersion which don't make a
        # normal API call.
        call_type => 'include',
        # This is the Spice that should be triggered by the query.
        caller => 'DDG::Spice::TflStatus',
    ),
    # You should include more test cases here. Try to think of ways that your
    # instant answer might break, and add them here to ensure they won't. Here are is
    # another that is tested for this Spice.
    'victoria line tfl' => test_spice(
        '/js/spice/tfl_status/victoria',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'hammersmith & city line tfl' => test_spice(
        '/js/spice/tfl_status/hammersmith-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'hammersmith & city line status' => test_spice(
        '/js/spice/tfl_status/hammersmith-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'hammersmith and city line status' => test_spice(
        '/js/spice/tfl_status/hammersmith-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'waterloo & city line tfl' => test_spice(
        '/js/spice/tfl_status/waterloo-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'waterloo & city line status' => test_spice(
        '/js/spice/tfl_status/waterloo-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'waterloo and city line status' => test_spice(
        '/js/spice/tfl_status/waterloo-city',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'overground line status' => test_spice(
        '/js/spice/tfl_status/london-overground',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'overground line london' => test_spice(
        '/js/spice/tfl_status/london-overground',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'victoria line underground' => test_spice(
        '/js/spice/tfl_status/victoria',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'circle line london underground' => test_spice(
        '/js/spice/tfl_status/circle',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'district line london tube' => test_spice(
        '/js/spice/tfl_status/district',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
    'jubilee line tube' => test_spice(
        '/js/spice/tfl_status/jubilee',
        call_type => 'include',
        caller => 'DDG::Spice::TflStatus',
    ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
