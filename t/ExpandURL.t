#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ExpandURL )],
    'expand ddg.gg' => test_spice(
        '/js/spice/expand_url/ddg.gg',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
);

done_testing;

