#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Movies::Filmography )],
    'film with tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'films with tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'movies with tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'movies featuring tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'films featuring tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'film starring tom cruise' => test_spice(
        '/js/spice/movies/filmography/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'Movies directed by Steven Spielberg' => test_spice(
        '/js/spice/movies/filmography/Steven%20Spielberg',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Filmography'
    ),
    'movies by tom cruise' => undef,
    'tom cruise movies directed' => undef
);

done_testing;

