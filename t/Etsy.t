#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Etsy)],
    'etsy rustic chairs' => test_spice(
        '/js/spice/etsy/rustic%20chairs',
        call_type => 'include',
        caller => 'DDG::Spice::Etsy'
    ),
    'Patio Furniture EtSy' => test_spice(
        '/js/spice/etsy/Patio%20Furniture',
        call_type => 'include',
        caller => 'DDG::Spice::Etsy'
    ),
    'etsy door-signs' => test_spice(
        '/js/spice/etsy/door-signs',
        call_type => 'include',
        caller => 'DDG::Spice::Etsy'
    ),

    'etsy' => undef,
    'rustic chairs' => undef,
    'rustic etsy chairs' => undef,
);

done_testing;

