#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Kwixer )],
    'film with tom cruise' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films with tom cruise' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies with tom cruise' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies with tom cruise and Kate' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20and%20Kate',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film starring tom cruise' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films starring tom cruise and kate' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20and%20kate',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies starring tom cruise and Kate' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20and%20Kate',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies directed Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies directed by Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'director Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film director Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film by Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films by Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films directed by Steven' => test_spice(
        '/js/spice/kwixer/Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'actress Kate' => test_spice(
        '/js/spice/kwixer/Kate',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'actor tom cruise' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
     'tom cruise actor' => test_spice(
        '/js/spice/kwixer/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'Keira Knightley actress' => test_spice(
        '/js/spice/kwixer/Keira%20Knightley',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
);

done_testing;

