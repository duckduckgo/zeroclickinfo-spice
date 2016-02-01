#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::FlashVersion )],
    'flash version' => test_spice(
        '/js/spice/flash_version/',
        call_type => 'self',
        caller => 'DDG::Spice::FlashVersion'
    ),
);

done_testing;

