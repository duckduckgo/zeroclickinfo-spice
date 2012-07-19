#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GooglePlus )],
    'what googleplus with duck' => test_spice(
        '/js/spice/google_plus/duck',
        call_type => 'include',
        caller => 'DDG::Spice::GooglePlus'
    ),
);

done_testing;

