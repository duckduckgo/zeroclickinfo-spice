#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bang )],
    '?yt' => test_spice(
        '/js/spice/bang',
        call_type => 'self',
        caller => 'DDG::Spice::Bang'
    )
);

done_testing;
