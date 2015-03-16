#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bootic )],
    'bootic watches' => test_spice(
        '/js/spice/bootic/watches',
        caller => 'DDG::Spice::Bootic',
    ),
    'bootic irobot' => test_spice(
        '/js/spice/bootic/irobot',
        caller => 'DDG::Spice::Bootic',
    ),
);

done_testing;

