#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Congress )],
    'ny representatives' => test_spice(
        '/js/spice/congress/house/ny',
        call_type => 'include',
        caller => 'DDG::Spice::Congress'
    ),
);

done_testing;

