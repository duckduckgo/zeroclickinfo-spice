#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::NxtAccount )],
    'NXT-AR77-SW4Y-M3VA-DUSTY' => test_spice(
        '/js/spice/nxt_account/NXT-AR77-SW4Y-M3VA-DUSTY',
        call_type => 'include',
        caller => 'DDG::Spice::NxtAccount'
    ),
    'nxt-w6ct-npdh-aaqw-hwcha' => test_spice(
        '/js/spice/nxt_account/nxt-w6ct-npdh-aaqw-hwcha',
        call_type => 'include',
        caller => 'DDG::Spice::NxtAccount',
    ),
    'NXT-XXXX-XXXX-XXXX-XXXXX' =>  => test_spice(
        '/js/spice/nxt_account/NXT-XXXX-XXXX-XXXX-XXXXX',
        call_type => 'include',
        caller => 'DDG::Spice::NxtAccount',
    ),
    'NXTMRCC2YLS8M543CMAJ' => undef,
    'something NXT-MRCC-2YLS-8M54-3CMAJ' => undef
);

done_testing;
