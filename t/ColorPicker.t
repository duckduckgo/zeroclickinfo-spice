#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ColorPicker )],
    'color picker' => test_spice(
        '/js/spice/color_picker/',
        call_type => 'self',
        caller => 'DDG::Spice::ColorPicker',
    ),
    'colour picker' => test_spice(
        '/js/spice/color_picker/',
        call_type => 'self',
        caller => 'DDG::Spice::ColorPicker',
    )
);

done_testing;
