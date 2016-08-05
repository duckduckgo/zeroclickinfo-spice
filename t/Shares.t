#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Shares )],
    'shares v' => test_spice(
        '/js/spice/shares/V',
        call_type => 'include',
        caller => 'DDG::Spice::Shares'
    )
);

done_testing;
