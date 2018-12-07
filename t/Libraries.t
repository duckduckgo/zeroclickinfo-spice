#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Libraries )],

    # should trigger
    'cran ggplot2' => test_spice(
        '/js/spice/libraries/cran/ggplot2',
        caller => 'DDG::Spice::Libraries',
    ),    
    'elm elm-html' => test_spice(
        '/js/spice/libraries/elm/elm-html',
        caller => 'DDG::Spice::Libraries',
    ),
    'go get glog' => test_spice(
        '/js/spice/libraries/go/glog',
        caller => 'DDG::Spice::Libraries',
    ),

    # shouldn't trigger
    'r wtf' => undef,
    'wp jetpack' => undef,
    'emacs rocks' => undef,
    'julia roberts' => undef,
    'wordpress themes' => undef,
    'golang latest version' => undef,
    'crystal hot springs' => undef,
    'atom remote execute' => undef,
    'nimble loans australia' => undef,
    'pub near belfast' => undef,
);

done_testing;

