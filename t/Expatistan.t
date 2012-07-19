#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Expatistan )],
    'what expatistan with duck' => test_spice(
        '/js/spice/expatistan/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Expatistan'
    ),
);

done_testing;

