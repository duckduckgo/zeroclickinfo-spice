#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::Xkcd::Xkcd'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    '619 xkcd' => test_spice(
        # The first argument is the Spice callback. It includes the javascript
        # endpoint and the argument list contructed by the Perl code. In this
        # case, the endpoint is '/js/spice/xkcd/xkcd/', and the argument returned by
        # the Perl code is 619.
        '/js/spice/xkcd/xkcd/619',
        # This is the Spice calltype. It's almost always set to 'include',
        # except for some special cases like FlashVersion which don't make a
        # normal API call.
        call_type => 'include',
        # This is the Spice that should be triggered by the query.
        caller => 'DDG::Spice::Xkcd::Xkcd',
    ),
    # You should include more test cases here. Try to think of ways that your
    # instant answer might break, and add them here to ensure they won't. Here are is
    # another that is tested for this Spice.
    'xkcd' => test_spice(
        '/js/spice/xkcd/xkcd/',
        call_type => 'include',
        caller => 'DDG::Spice::Xkcd::Xkcd',
    ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
