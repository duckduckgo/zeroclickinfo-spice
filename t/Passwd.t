#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Passwd'
    ],
    'genpass' => test_spice(
        '/js/spice/passwd/1',
        call_type => 'include',
        caller => 'DDG::Spice::Passwd',
    ),
    'generate' => undef,
    'password' => undef,
    'generate electricity' => undef,
    'generate passwd' => test_spice(
        '/js/spice/passwd/1',
        call_type => 'include',
        caller => 'DDG::Spice::Passwd',
    ),
    'generate password' => test_spice(
        '/js/spice/passwd/1',
        call_type => 'include',
        caller => 'DDG::Spice::Passwd',
    ),
);

done_testing;
