#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Edrpou)],
    'EDRPOU 32289188' => test_spice(
        '/js/spice/edrpou/32289188',
        call_type => 'include',
        caller => 'DDG::Spice::Edrpou'
    ),
    '32289188 ЄДР' => test_spice(
        '/js/spice/edrpou/32289188',
        caller    => 'DDG::Spice::Edrpou',
    ),
    '32289188 ЄДРПОУ' => test_spice(
        '/js/spice/edrpou/32289188',
        caller    => 'DDG::Spice::Edrpou',
    ),
    'ЄДРПОУ 32289188' => test_spice(
        '/js/spice/edrpou/32289188',
        caller    => 'DDG::Spice::Edrpou',
    ),
    'ЄДР 32289188' => test_spice(
        '/js/spice/edrpou/32289188',
        caller    => 'DDG::Spice::Edrpou',
    ),    
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'EDRPOU code' => undef,
    'ЄДРПОУ код' => undef,
    'ЄДР код' => undef,
);

done_testing;

