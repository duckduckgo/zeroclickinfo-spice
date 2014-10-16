#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::<: $ia_package_name :>)],
    'example query' => test_spice(
        '/js/spice/<: $lia_name :>/query',
        call_type => 'include',
        caller => 'DDG::Spice:<: $ia_package_name :>'
    )
);

done_testing;

