#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # Spice namespace
        'DDG::Spice::TorRelay'
    ],
    # test: tor relay [unique relay nickname]
    'tor relay lupe' => test_spice(
        # call
        '/js/spice/tor_relay/lupe',
        # calltype
        call_type => 'include',
        # caller
        caller => 'DDG::Spice::TorRelay',
    ),
    # test: [relay fingerprint] onion relay
    '3C687863C36BE05F8588F812C29BF34654802A23 onion relay' => test_spice(
        # call
        '/js/spice/tor_relay/3c687863c36be05f8588f812c29bf34654802a23',
        # calltype
        call_type => 'include',
        # caller
        caller => 'DDG::Spice::TorRelay',
    ),
    # test: tor relay [relay ip]
    'tor relay 50.116.46.20' => test_spice(
        # call
        '/js/spice/tor_relay/50.116.46.20',
        # calltype
        call_type => 'include',
        # caller
        caller => 'DDG::Spice::TorRelay',
    ),
    # test: tor relay
    'tor relay' => test_spice(
        # call
        '/js/spice/tor_relay/',
        # calltype
        call_type => 'include',
        # caller
        caller => 'DDG::Spice::TorRelay',
    )
);

# This function call is expected by Test::More. It makes sure the program
# doesn't exit before all the tests have been run.
done_testing;
