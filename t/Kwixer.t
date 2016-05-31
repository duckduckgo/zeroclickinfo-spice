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
    'movies tom cruise' => test_spice(
        '/js/spice/kwixer/movies%20tom%20cruise',
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
    'new movies with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movies%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new movie with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movie%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new movie starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movie%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new movies starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movies%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new movies featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movies%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new movie featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20movie%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new films featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20films%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new film featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20film%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new films starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20films%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new film starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20film%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new film with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20film%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'new films with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/new%20films%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest films with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20films%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest film with tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20film%20with%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest film starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20film%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest films starring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20films%20starring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest film featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20film%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'newest films featuring tom cruise and Emily' => test_spice(
        '/js/spice/kwixer/newest%20films%20featuring%20tom%20cruise%20and%20Emily',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movies directed by ron howard' => test_spice(
        '/js/spice/kwixer/movies%20directed%20by%20ron%20howard',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'films by ron howard' => test_spice(
        '/js/spice/kwixer/films%20by%20ron%20howard',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'movie directed by ron howard' => test_spice(
        '/js/spice/kwixer/movie%20directed%20by%20ron%20howard',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film directed by ron howard' => test_spice(
        '/js/spice/kwixer/film%20directed%20by%20ron%20howard',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'film director ron howard' => test_spice(
        '/js/spice/kwixer/film%20director%20ron%20howard',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise film' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20film',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise films' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20films',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise new film' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20new%20film',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise new films' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20new%20films',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise newest film' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20newest%20film',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise newest films' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20newest%20films',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise movie' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise movies' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20movies',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise new movie' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20new%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise new movies' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20new%20movies',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise newest movie' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20newest%20movie',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
    'tom cruise newest movies' => test_spice(
        '/js/spice/kwixer/tom%20cruise%20newest%20movies',
        call_type => 'include',
        caller => 'DDG::Spice::Kwixer'
    ),
);

done_testing;

