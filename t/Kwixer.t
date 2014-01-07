#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Kwixer )],
    'film with tom cruise' => test_spice(
        '/js/spice/kwixer/film%20with%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films with tom cruise' => test_spice(
        '/js/spice/kwixer/films%20with%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies with tom cruise' => test_spice(
        '/js/spice/kwixer/movies%20with%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies featuring tom cruise' => test_spice(
        '/js/spice/kwixer/movies%20featuring%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/movies%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films featuring tom cruise' => test_spice(
        '/js/spice/kwixer/films%20featuring%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/films%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/movies%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film starring tom cruise' => test_spice(
        '/js/spice/kwixer/film%20starring%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/films%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/movies%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies directed Steven' => test_spice(
        '/js/spice/kwixer/movies%20directed%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies directed by Steven' => test_spice(
        '/js/spice/kwixer/movies%20directed%20by%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'director Steven' => test_spice(
        '/js/spice/kwixer/director%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film director Steven' => test_spice(
        '/js/spice/kwixer/film%20director%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film by Steven' => test_spice(
        '/js/spice/kwixer/film%20by%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films by Steven' => test_spice(
        '/js/spice/kwixer/films%20by%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films directed by Steven' => test_spice(
        '/js/spice/kwixer/films%20directed%20by%20Steven',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'actress Kate' => test_spice(
        '/js/spice/kwixer/actress%20Kate',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'actor tom cruise' => test_spice(
        '/js/spice/kwixer/actor%20tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
     'tom cruise actor' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20actor',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'Keira Knightley actress' => test_spice(
        '/js/spice/kwixer/Keira%20Knightley%20actress',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
);

done_testing;

