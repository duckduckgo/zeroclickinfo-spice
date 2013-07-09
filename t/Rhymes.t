#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Rhymes )],
    'what rhymes with duck' => test_spice(
        '/js/spice/rhymes/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
    'what words rhymes with quack?' => test_spice(
        '/js/spice/rhymes/quack',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
    'dax rhymes with?' => test_spice(
        '/js/spice/rhymes/dax',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
    'Rhyme LIST' => test_spice(
        '/js/spice/rhymes/list',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
    'words that rhyme with rhyme' => test_spice(
        '/js/spice/rhymes/rhyme',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
        is_cached => 1
    ),
    'rhymes' => undef,
);

done_testing;

