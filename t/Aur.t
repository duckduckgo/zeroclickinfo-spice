#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Aur )],
    'what aur with duck' => test_spice(
        '/js/spice/aur/duck',
        call_type => 'include',
        caller => 'DDG::Spice::Aur'
    ),
);

done_testing;

