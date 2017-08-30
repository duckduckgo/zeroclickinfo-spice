#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Github )],
    'c++ test github' => test_spice(
        '/js/spice/github/test%20language%3A%22c%2B%2B%22',
        call_type => 'include',
        caller => 'DDG::Spice::Github'
    ),
    'github test c++' => test_spice(
        '/js/spice/github/test%20language%3A%22c%2B%2B%22',
        call_type => 'include',
        caller => 'DDG::Spice::Github'
    ),
    'rails invalid authenticity github issue' => undef,
    'github status' => undef,
    'github' => undef,
    'github ' => undef
);

done_testing;

