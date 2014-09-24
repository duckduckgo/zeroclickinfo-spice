#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::CodeSearch )],
    'perl code' => test_spice(
        '/js/spice/code_search/lang%3Aperl%20',
        caller => 'DDG::Spice::CodeSearch'
    ),
    'javascript console.log example' => test_spice(
        '/js/spice/code_search/lang%3Ajavascript%20console.log',
        caller => 'DDG::Spice::CodeSearch'
    ),
);

done_testing;

