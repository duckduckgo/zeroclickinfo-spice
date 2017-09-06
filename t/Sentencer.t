#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Sentencer)],
    '1 metaphorpsum' => test_spice(
        '/js/spice/sentencer/1',
        call_type => 'include',
        caller => 'DDG::Spice::Sentencer'
    ),
    'metaphors 5' => test_spice(
        '/js/spice/sentencer/5',
        call_type => 'include',
        caller => 'DDG::Spice::Sentencer'
    ),
    'what is metaphorsum' => undef,
    'metaphorsum website' => undef,
    'metaphorsum duuuuh' => undef,
);

done_testing;

