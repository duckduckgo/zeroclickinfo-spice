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
);

done_testing;

