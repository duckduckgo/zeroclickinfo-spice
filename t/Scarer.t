#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Scarer )],
    'scare me' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Scarer',
    ),
    'show me something scary' => test_spice(
        '',
        call_type => 'self',
        caller => 'DDG::Spice::Scarer',
    ),
);

done_testing;
