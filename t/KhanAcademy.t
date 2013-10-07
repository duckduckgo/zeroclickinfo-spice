#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::KhanAcademy )],
    'khan calculus' => test_spice(
        '/js/spice/khan_academy/calculus',
        caller => 'DDG::Spice::KhanAcademy'
    ),
    'khan academy trigonometry' => test_spice(
        '/js/spice/khan_academy/trigonometry',
        caller => 'DDG::Spice::KhanAcademy'
    ),
);

done_testing;

