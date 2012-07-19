#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::CodeSearch )],
    'what codesearch with duck' => test_spice(
        '/js/spice/code_search/duck',
        call_type => 'include',
        caller => 'DDG::Spice::CodeSearch'
    ),
);

done_testing;

