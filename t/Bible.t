#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bible )],
    'james 1:26' => test_spice(
        '/js/spice/bible/james%201%3A26',
        call_type => 'include',
        caller => 'DDG::Spice::Bible'
    ),
);

done_testing;

