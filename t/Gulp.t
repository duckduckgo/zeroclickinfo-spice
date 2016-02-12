#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Gulp)],
    'gulpjs sass' => test_spice(
        '/js/spice/gulp/sass',
        call_type => 'include',
        caller => 'DDG::Spice::Gulp'
    ),
    'gulping' => undef,
);

done_testing;

