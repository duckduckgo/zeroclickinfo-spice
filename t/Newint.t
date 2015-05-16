#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Newint'
    ],
    'gold newint' => test_spice(
        '/js/spice/newint/gold',
        call_type => 'include',
        caller => 'DDG::Spice::Newint',
    ),
    'newint' => test_spice(
        '/js/spice/newint/',
        call_type => 'include',
        caller => 'DDG::Spice::Newint',
    ),
);

done_testing;
