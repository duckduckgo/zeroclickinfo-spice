#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::ExpandURL )],
    'what expandurl with duck' => test_spice(
        '/js/spice/expand_url/duck',
        call_type => 'include',
        caller => 'DDG::Spice::ExpandURL'
    ),
);

done_testing;

