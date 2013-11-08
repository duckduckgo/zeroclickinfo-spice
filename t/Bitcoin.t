#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bitcoin )],
    'bitcoin' => test_spice(
        '/js/spice/bitcoin/',
        call_type => 'include',
        caller => 'DDG::Spice::Bitcoin'
    ),
);

done_testing;

