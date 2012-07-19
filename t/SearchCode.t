#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SearchCode )],
    'what searchcode with duck' => test_spice(
        '/js/spice/search_code/duck',
        call_type => 'include',
        caller => 'DDG::Spice::SearchCode'
    ),
);

done_testing;

