#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_chefio(
    [qw( DDG::Spice::Chefio)],
    'cookbook for php' => test_spice(
        '/js/spice/chefio/query',
        call_type => 'include',
        caller => 'DDG::Spice:Chefio'
    ),
    'chef cookbook perl' => test_spice(
        'js/spice/chefio/query',
        call_type => 'include',
        caller => 'DDG:Spice:Chefio'
    ),
    'bad example query' => undef,
);

done_testing;

