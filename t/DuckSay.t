#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(
        DDG::Spice::DuckSay
    )],
    'ducksay' => test_spice(
        '/js/spice/duck_say/',
        call_type => 'include',
        caller => 'DDG::Spice::DuckSay'
    ),
    'ducksay hello world!' => test_spice(
        'hello world!',
        call_type => 'self',
        caller => 'DDG::Spice::DuckSay'
    )
);

done_testing;

