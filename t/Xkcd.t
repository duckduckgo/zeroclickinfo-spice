#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::Xkcd'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    'xkcd' => test_spice(
        '/js/spice/xkcd/',
        # This is the Spice calltype. It's almost always set to 'include',
        # except for some special cases like FlashVersion which don't make a
        # normal API call.
        call_type => 'include',
        # This is the Spice that should be triggered by the query.
        caller => 'DDG::Spice::Xkcd',
        # This is the cache value to expect. It's only necessary if you specify
        # one in your Spice.
        is_cached => 0
    ),
    # You should include more test cases here. Try to think of ways that your
    # plugin might break, and add them here to ensure they won't. Here are is
    # another that is tested for this Spice.
    '619 xkcd' => test_spice(
        '/js/spice/xkcd/619',
        call_type => 'include',
        caller => 'DDG::Spice::Xkcd',
        is_cached => 0
    ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
