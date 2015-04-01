#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DogoBooks )],
    'dogobooks' => test_spice(
        '/js/spice/dogo_books/dogobooks',
        call_type => 'include',
        caller => 'DDG::Spice::DogoBooks'
    ),
    'dogo books' => test_spice(
        '/js/spice/dogo_books/dogo%20books',
        call_type => 'include',
        caller => 'DDG::Spice::DogoBooks'
    ),
    'kids books' => test_spice(
        '/js/spice/dogo_books/kids%20books',
        call_type => 'include',
        caller => 'DDG::Spice::DogoBooks'
    ),
    'smile kids book' => test_spice(
        '/js/spice/dogo_books/smile%20kids%20book',
        call_type => 'include',
        caller => 'DDG::Spice::DogoBooks'
    ),
    'hunger games book kids review' => test_spice(
        '/js/spice/dogo_books/hunger%20games%20book%20kids%20review',
        call_type => 'include',
        caller => 'DDG::Spice::DogoBooks'
    )
);

done_testing;

