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
    ),
    'what words rhymes with quack?' => test_spice(
        '/js/spice/rhymes/quack',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
    ),
    'dax rhymes with?' => test_spice(
        '/js/spice/rhymes/dax',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
    ),
    'Rhyme LIST' => test_spice(
        '/js/spice/rhymes/list',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
    ),
    'words that rhyme with rhyme' => test_spice(
        '/js/spice/rhymes/rhyme',
        call_type => 'include',
        caller => 'DDG::Spice::Rhymes',
    ),
    'rhymes' => undef,
);

done_testing;

