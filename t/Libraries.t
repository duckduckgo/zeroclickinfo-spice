#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Libraries )],
    'perl next' => test_spice(
        '/js/spice/libraries/wordpress%20plugins',
        caller => 'DDG::Spice::Libraries'
    ),
    'underscore.js bind' => test_spice(
        '/js/spice/libraries/elm%20elm-html',
        caller => 'DDG::Spice::Libraries',
    ),
    'php print_r' => test_spice(
        '/js/spice/libraries/go%20get%20math',
        caller => 'DDG::Spice::Libraries',
    ),
);

done_testing;

