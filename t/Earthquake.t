#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Earthquake )],
    'earthquake' => test_spice(
        '/js/spice/earthquake/',
        call_type => 'include',
        caller => 'DDG::Spice::Earthquake',
    ),
);

done_testing;