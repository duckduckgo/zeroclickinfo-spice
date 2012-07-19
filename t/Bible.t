#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bible )],
    'what bible with duck' => test_spice(
        '/js/spice/bible/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Bible'
    ),
);

done_testing;

