#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Wikinews )],
    'news' => test_spice(
        '/js/spice/wikinews/',
        call_type => 'include',
        caller => 'DDG::Spice::Wikinews',
    ),
    'wikinews' => test_spice(
        '/js/spice/wikinews/',
        call_type => 'include',
        caller => 'DDG::Spice::Wikinews',
    ),
);

done_testing;

