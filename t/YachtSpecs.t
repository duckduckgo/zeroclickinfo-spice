#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::YachtSpecs)],
    'yacht maluhea' => test_spice(
        '/js/spice/yacht_specs/maluhea',
        call_type => 'include',
        caller => 'DDG::Spice::YachtSpecs'
    ),
    'custom line yacht maluhea' => undef,
'private yacht maluhea' => undef,
'yacht club' => undef,
'yacht crew' => undef
);

done_testing;

