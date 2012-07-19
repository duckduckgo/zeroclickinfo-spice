#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Canistreamit )],
    'what canistreamit with duck' => test_spice(
        '/js/spice/canistreamit/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Canistreamit'
    ),
);

done_testing;

