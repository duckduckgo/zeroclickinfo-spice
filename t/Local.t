#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Local )],
    'nearest primos' => test_spice(
        '/js/spice/local/primos',
        call_type => 'include',
        caller => 'DDG::Spice::Local'
    ),
);

done_testing;

