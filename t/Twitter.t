#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Twitter )],
    'what twitter with duck' => test_spice(
        '/js/spice/twitter/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter'
    ),
);

done_testing;

