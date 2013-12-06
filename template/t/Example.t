#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::<: $ia_name :>)],
    'example query' => test_spice(
        '/js/spice/<: $lia_name :>/query',
        call_type => 'include',
        caller => 'DDG::Spice:<: $ia_name :>'
    )
);

done_testing;

