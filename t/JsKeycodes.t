#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::JsKeycodes )],
    'javascript key code j' => test_spice(
        '/js/spice/js_keycodes/',
        call_type => 'self',
        caller => 'DDG::Spice::JsKeycodes'
    ),
    'javascript keycodes' => test_spice(
        '/js/spice/js_keycodes/',
        call_type => 'self',
        caller => 'DDG::Spice::JsKeycodes'
    ),
    'js keycode enter' => test_spice(
        '/js/spice/js_keycodes/',
        call_type => 'self',
        caller => 'DDG::Spice::JsKeycodes'
    ),
    'keycode foo' => undef,
    'keycode tab' => undef,
    'keycodes' => undef
);

done_testing;

