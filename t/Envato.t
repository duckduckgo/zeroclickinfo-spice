#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Envato )],
    'themeforest responsive portfolio' => test_spice(
        '/js/spice/envato/themeforest/responsive%7Cportfolio',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'audiojungle happy electronic' => test_spice(
        '/js/spice/envato/audiojungle/happy%7Celectronic',
        call_type => 'include',
        caller => 'DDG::Spice::Envato'
    ),
    'creative modern portfolio' => undef
);

done_testing;