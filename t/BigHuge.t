#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BigHuge )],
    'synonym for search' => test_spice(
        '/js/spice/big_huge/search/synonym',
        call_type => 'include',
        caller => 'DDG::Spice::BigHuge'
    ),
);

done_testing;

