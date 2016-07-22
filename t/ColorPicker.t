#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

my @test_args = (
    '',
    call_type => 'self',
    caller => 'DDG::Spice::ColorPicker',
);

ddg_spice_test(
    [qw( DDG::Spice::ColorPicker )],
    'color picker' => test_spice(@test_args),
    'colour picker' => test_spice(@test_args),
    'colorpicker' => test_spice(@test_args),
    'colourpicker' => test_spice(@test_args),
    'color picker #aaa' => test_spice(@test_args),
    'color picker aaa111' => test_spice(@test_args),
    'color picker #aaa111' => test_spice(@test_args),
    'color picker rgb(192, 168, 1)' => test_spice(@test_args),
    'color picker hsv(270, 65%, 80%)' => test_spice(@test_args),
    'color picker cmyk(10, 20, 30, 40)' => test_spice(@test_args),
    'colour Picker' => test_spice(@test_args),
    'ColorPicker' => test_spice(@test_args),
    'colorPicker' => test_spice(@test_args)
);

done_testing;
