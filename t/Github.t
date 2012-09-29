#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Github )],
    'github zeroclickinfo' => test_spice(
        '/js/spice/github/zeroclickinfo',
        call_type => 'include',
        caller => 'DDG::Spice::Github'
    ),
);

done_testing;

