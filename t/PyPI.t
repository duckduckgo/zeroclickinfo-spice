#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::PyPI )],
    'django python' => test_spice(
        '/js/spice/python_eggs/django',
        call_type => 'include',
        caller => 'DDG::Spice::PyPI'
    ),
    'zodb pip' => test_spice(
        '/js/spice/python_eggs/zodb',
        call_type => 'include',
        caller => 'DDG::Spice::PyPI'
    ),
);

done_testing;

