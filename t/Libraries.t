#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Libraries )],
    'wordpress woocommerce' => test_spice(
        '/js/spice/libraries/wordpress%2Fwoocommerce',
        caller => 'DDG::Spice::Libraries'
    ),
    'elm elm-html' => test_spice(
        '/js/spice/libraries/elm%2Felm-html',
        caller => 'DDG::Spice::Libraries',
    ),
    'go glog' => test_spice(
        '/js/spice/libraries/go%2Fglog',
        caller => 'DDG::Spice::Libraries',
    ),
);

done_testing;

