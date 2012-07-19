#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Github )],
    'what github with duck' => test_spice(
        '/js/spice/github/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Github'
    ),
);

done_testing;

