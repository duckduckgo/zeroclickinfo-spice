#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Tumblr )],
    'tumblr ducks' => test_spice(
        '/js/spice/tumblr/ducks',
        caller => 'DDG::Spice::Tumblr'
    ),
);

done_testing;

