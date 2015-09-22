#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::DDG::Spice::Translation)],
    'translate library from english to french' => test_spice(
        '/js/spice/ddg_spice_translation/library/french-english',
        call_type => 'include',
        caller => 'DDG::Spice::DDG::Spice::Translation'
    ),
    'translate' => undef,
);

done_testing;
