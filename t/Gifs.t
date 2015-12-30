#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Gifs)],
    'giphy cat' => test_spice(
        '/js/spice/gifs/cat',
        call_type => 'include',
        caller => 'DDG::Spice::Gifs'
    ),
    'giphy cat gifs' => test_spice(
        '/js/spice/gifs/cat',
        call_type => 'include',
        caller => 'DDG::Spice::Gifs'
    ),
);

done_testing;
