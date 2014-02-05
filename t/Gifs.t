#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Gifs)],
    'cat gifs' => test_spice(
        '/js/spice/gifs/cat%20gifs',
        call_type => 'include',
        caller => 'DDG::Spice::Gifs'
    ),
);

done_testing;

