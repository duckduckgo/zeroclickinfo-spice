#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Arxiv)],
    'arxiv 1010.2163v1' => test_spice(
        '/js/spice/arxiv/1010.2163v1',
        call_type => 'include',
        caller => 'DDG::Spice::Arxiv'
    ),
    'arxiv:1010.2163v1' => test_spice(
        '/js/spice/arxiv/1010.2163v1',
        call_type => 'include',
        caller => 'DDG::Spice::Arxiv'
    ),
    'arxiv:quant-ph/0508054' => test_spice(
        '/js/spice/arxiv/quant-ph%2F0508054',
        call_type => 'include',
        caller => 'DDG::Spice::Arxiv'
    ),
);

done_testing;

