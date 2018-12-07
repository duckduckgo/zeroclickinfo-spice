#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Grunt)],
    'grunt plugin sass' => test_spice(
        '/js/spice/grunt/sass',
        call_type => 'include',
        caller => 'DDG::Spice::Grunt'
    ),
    'grunting' => undef,
);

done_testing;

