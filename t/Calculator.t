#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Calculator)],
    # TODO: Revisit when triggers are done
    '5 + 5=' => test_spice(
        '/js/spice/calculator/',
        call_type => 'self',
        caller => 'DDG::Spice::Calculator'
    ),
    # Potential false-positives
    '5 + 5 = 0' => undef,
);

done_testing;

