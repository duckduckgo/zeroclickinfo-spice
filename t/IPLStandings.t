#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::IPLStandings)],
    'ipl' => test_spice(
        '/js/spice/iplstandings/',
        call_type => 'include',
        caller => 'DDG::Spice::IPLStandings'
    ),
);

done_testing;

