#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::ISBN'
    ],
    # "isbn" trigger
    'isbn 0330287001' => test_spice(
        '/js/spice/isbn/0330287001',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # "isbn number" trigger
    'isbn number 0-06-250217-4' => test_spice(
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
    # extra hyphens
    '978---0 7432 4722 1 isbn number' => test_spice(
        '/js/spice/isbn/9780743247221',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # "isbn lookup" trigger
    '978----3-16-148410-0 ISBN lookup' => test_spice(
        '/js/spice/isbn/9783161484100',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # extra spaces
    'isbn lookup 9780141   382685' => test_spice(
        '/js/spice/isbn/9780141382685',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # not triggered (because remainder length is not 10 or 13)
    'isbn lookup 42' => undef,
    # not triggered (because remainder is not purely a number)
    'isbn lookup Germany 7-1 Brazil' => undef,
);

done_testing;
