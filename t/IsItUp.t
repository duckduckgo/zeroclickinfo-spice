#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::IsItUp )],
    'what isitup with duck' => test_spice(
        '/js/spice/is_it_up/duck',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp'
    ),
);

done_testing;

