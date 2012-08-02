#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Twitter::User )],
    'twitter duckduckgo' => test_spice(
        '/js/spice/twitter/user/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter::User'
    ),
);

ddg_spice_test(
    [qw( DDG::Spice::Twitter::Locate )],
    'twitter trends usa' => test_spice(
        '/js/spice/twitter/locate/usa',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter::Locate'
    ),
);


# NOTE: This test does not currently work as this 
#       is an internally triggered spice.
##################################################
# ddg_spice_test(
#     [qw( DDG::Spice::Twitter::Trends )],
#     'twitter duckduckgo' => test_spice(
#         '/js/spice/twitter/trends/duckduckgo',
#         call_type => 'include',
#         caller => 'DDG::Spice::Twitter::Trends'
#     ),
# );

done_testing;