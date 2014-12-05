#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::IndianRailPnrStatus'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    'pnr 4101917424' => test_spice(
        # The first argument is the Spice callback. It includes the javascript
        # endpoint and the argument list constructed by the Perl code. In this
        # case, the endpoint is '/js/spice/xkcd/', and the argument returned by
        # the Perl code is 619.
        '/js/spice/indian_rail_pnr_status/4101917424',
        # This is the Spice calltype. It's almost always set to 'include',
        # except for some special cases like FlashVersion which don't make a
        # normal API call.
        call_type => 'include',
        # This is the Spice that should be triggered by the query.
        caller => 'DDG::Spice::IndianRailPnrStatus',
        # This is the cache value to expect. It's only necessary if you specify
        # one in your Spice.
        is_cached => 1
    )#,
    # You should include more test cases here. Try to think of ways that your
    # Instant Answer might break, and add them here to ensure they won't. Here are is
    # another that is tested for this Spice.
    #'pnr' => test_spice(
     #   '/js/spice/indian_rail_pnr_status/',
      #  call_type => 'include',
       # caller => 'DDG::Spice::IndianRailPnrStatus',
       # is_cached => 1
   # ),
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
