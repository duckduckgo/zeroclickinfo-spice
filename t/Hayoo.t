#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Hayoo )],
    'hayoo Prelude.map' => test_spice(
        '/js/spice/hayoo/Prelude.map',
        call_type => 'include',
        caller => 'DDG::Spice::Hayoo'
    ),
);

done_testing;

