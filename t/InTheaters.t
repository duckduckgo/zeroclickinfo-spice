#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::InTheaters )],
    'movies now showing' => test_spice(
        '/js/spice/in_theaters/in_theaters',
        call_type => 'include',
        caller => 'DDG::Spice::InTheaters'
    ),
);

done_testing;

