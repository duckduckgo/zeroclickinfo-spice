#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [ 'DDG::Spice::ISBN' ],
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
    # Traction book ISBN-10
    '0976339609' => test_spice(
        '/js/spice/isbn/0976339609',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # Extra dashes and spaces in ISBN-10
    '0--976     339--6-09' => test_spice(
        '/js/spice/isbn/0976339609',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # Traction book ISBN-13
    '978-0976339601' => test_spice(
        '/js/spice/isbn/9780976339601',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # Extra dashes and spaces in ISBN 13
    '978--09763 3960--1' => test_spice(
        '/js/spice/isbn/9780976339601',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # ISBN-10 with X, nee 10, as the check digit
    '0-8044-2957-X' => test_spice(
        '/js/spice/isbn/080442957X',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # Same thing, all compressed.
    '080442957X' => test_spice(
        '/js/spice/isbn/080442957X',
        call_type => 'include',
        caller => 'DDG::Spice::ISBN',
        is_cached => 1
    ),
    # Mistyped ISBN-10 with X
    '0-8044-2967-X' => undef,
    # Mistyped ISBN-13
    '978-0876339601' => undef,
    # Mistyped ISBN-10
    '0976333609' => undef,
    # not triggered (because remainder length is not 10 or 13)
    'isbn lookup 42' => undef,
    # not triggered (because remainder after cleanup is not purely a number)
    'isbn lookup Germany 7-1 Brazil' => undef,

    # phone numbers
    '951-383-4565' => undef,
    '302-212-1326' => undef,
    '210 294 2260' => undef,
    '971 208 9355' => undef,
);

done_testing;
