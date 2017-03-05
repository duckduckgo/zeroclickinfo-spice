#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Libraries )],
    'wordpress/woocommerce' => test_spice(
        '/js/spice/libraries/wordpress woocommerce',
        caller => 'DDG::Spice::Libraries'
    ),
    'elm/elm-html' => test_spice(
        '/js/spice/libraries/elm elm-html',
        caller => 'DDG::Spice::Libraries',
    ),
    'go/glog' => test_spice(
        '/js/spice/libraries/go glog',
        caller => 'DDG::Spice::Libraries',
    ),
);

done_testing;

