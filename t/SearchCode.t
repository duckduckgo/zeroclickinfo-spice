#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SearchCode )],
    'perl next' => test_spice(
        '/js/spice/search_code/perl%20next',
        caller => 'DDG::Spice::SearchCode'
    ),
    'underscore.js bind' => test_spice(
        '/js/spice/search_code/underscore.js%20bind',
        caller => 'DDG::Spice::SearchCode',
    ),
    'php print_r' => test_spice(
        '/js/spice/search_code/php%20print_r',
        caller => 'DDG::Spice::SearchCode',
    ),
);

done_testing;

