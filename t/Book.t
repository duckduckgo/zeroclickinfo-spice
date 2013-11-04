#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Book)],
    'book reviews moonwalking with einstein' => test_spice(
        '/js/spice/book/moonwalking%20with%20einstein',
        caller => 'DDG::Spice::Book'
    ),
);

done_testing;