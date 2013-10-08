#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::News )],
    'obama news' => test_spice(
        '/js/spice/news/obama%20news',
        call_type => 'include',
        caller => 'DDG::Spice::News'
    ),
);

done_testing;
