#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::LeakDB )],
    'leakdb edbd1887e772e13c251f688a5f10c1ffbb67960d' => test_spice(
        '/js/spice/leak_db/edbd1887e772e13c251f688a5f10c1ffbb67960d',
        call_type => 'include',
        caller => 'DDG::Spice::LeakDB'
    ),
    'leakdb secretpassword' => test_spice(
        '/js/spice/leak_db/secretpassword',
        call_type => 'include',
        caller => 'DDG::Spice::LeakDB'
    ),
    'hashme password' => test_spice(
        '/js/spice/leak_db/password',
        call_type => 'include',
        caller => 'DDG::Spice::LeakDB'
    ),
);

done_testing;

