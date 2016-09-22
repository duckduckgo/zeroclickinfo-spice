#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::CodeSearch )],
    'perl code' => test_spice(
        '/js/spice/code_search/perl%20',
        caller => 'DDG::Spice::CodeSearch'
    ),
    'javascript console.log example' => test_spice(
        '/js/spice/code_search/javascript%20console.log',
        caller => 'DDG::Spice::CodeSearch'
    ),
);

done_testing;

