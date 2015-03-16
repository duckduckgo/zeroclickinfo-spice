#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::GooglePlus )],
    'g+ dax' => test_spice(
        '/js/spice/google_plus/dax',
        call_type => 'include',
        caller => 'DDG::Spice::GooglePlus'
    ),
    'google+ duckduckgo' => test_spice(
        '/js/spice/google_plus/duckduckgo',
        caller    => 'DDG::Spice::GooglePlus',
    ),
);

done_testing;

