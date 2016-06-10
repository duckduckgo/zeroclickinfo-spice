#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::GitBookStatus)],

    'gitbook status' => test_spice(
        '/js/spice/git_book_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'gitbook down' => test_spice(
        '/js/spice/git_book_status/down',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'gitbook up' => test_spice(
        '/js/spice/git_book_status/up',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'gitbook system status' => test_spice(
        '/js/spice/git_book_status/system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'gitbook system up' => test_spice(
        '/js/spice/git_book_status/system%20up',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'gitbook system down' => test_spice(
        '/js/spice/git_book_status/system%20down',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'status of gitbook' => test_spice(
        '/js/spice/git_book_status/status%20of',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'is gitbook down' => test_spice(
        '/js/spice/git_book_status/is%20down',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'is gitbook system up' => test_spice(
        '/js/spice/git_book_status/is%20system%20up',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),
    'is gitbook system down' => test_spice(
        '/js/spice/git_book_status/is%20system%20down',
        call_type => 'include',
        caller => 'DDG::Spice::GitBookStatus'
    ),

    'about gitbook' => undef,
    'what is gitbook' => undef,
    'gitbook' => undef
);

done_testing;
