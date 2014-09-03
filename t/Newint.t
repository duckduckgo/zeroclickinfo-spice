#!/usr/bin/env perl

use strict;
use warnings;

# These modules are necessary for the functions we'll be running.
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::Newint'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    'gold newint' => test_spice(
        # The first argument is the Spice callback. It includes the javascript
        # endpoint and the argument list contructed by the Perl code.
        '/js/spice/newint/gold',
        # This is the Spice calltype. It's almost always set to 'include',
        # except for some special cases like FlashVersion which don't make a
        # normal API call.
        call_type => 'include',
        # This is the Spice that should be triggered by the query.
        caller => 'DDG::Spice::Newint',
    ),
    # You should include more test cases here. Try to think of ways that your
    # instant answer might break, and add them here to ensure they won't. Here are is
    # another that is tested for this Spice.
    'newint' => test_spice(
        '/js/spice/newint/',
        call_type => 'include',
        caller => 'DDG::Spice::Newint',
    ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
