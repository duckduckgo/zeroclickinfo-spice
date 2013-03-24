#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::UrbanDictionary )],
    'urban dictionary cool' => test_spice(
        '/js/spice/google_plus/cool',
        call_type => 'include',
        caller => 'DDG::Spice::UrbanDictionary'
    ),
);

done_testing;
