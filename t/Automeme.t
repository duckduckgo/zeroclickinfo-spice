#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Automeme )],
    'what automeme with duck' => test_spice(
        '/js/spice/automeme/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Automeme'
    ),
);

done_testing;

