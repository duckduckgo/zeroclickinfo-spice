#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::ISBN'
    ],
    'isbn 0330287001' => test_spice(
        '/js/spice/isbn/0330287001',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    'isbn 0-06-250217-4' => test_spice(
        '/js/spice/isbn/0062502174',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    '0-330-2870 0-1  ISBN' => test_spice(
        '/js/spice/isbn/0330287001',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    '978 0 7432 4722 1 ISBN' => test_spice(
        '/js/spice/isbn/9780743247221',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
);

done_testing;
