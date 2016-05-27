#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Movies::Cast )],
    'film with tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'films with tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'movies with tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'movies featuring tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'films featuring tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'film starring tom cruise' => test_spice(
        '/js/spice/movies/cast/tom%20cruise',
        call_type => 'include',
        caller => 'DDG::Spice::Movies::Cast'
    ),
    'Movies directed by tom cruise' => undef,
    'movies by tom cruise' => undef,
    'tom cruise movies directed' => undef
);

done_testing;

