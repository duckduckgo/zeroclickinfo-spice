#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Guidebox::Getid )],

    'guidebox NCIS' => test_spice(
        '/js/spice/guidebox/getid/NCIS',
        call_type => 'include',
        caller => 'DDG::Spice::Guidebox::Getid'
    ),

    'watch dexte' => undef,
    'recent episodes The Big Bang Theory' => undef,
    'watch movies' => undef,
    'watch series' => undef,
);

done_testing;

