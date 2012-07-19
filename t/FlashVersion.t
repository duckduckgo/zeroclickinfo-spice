#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::FlashVersion )],
    'what flashversion with duck' => test_spice(
        '/js/spice/flash_version/duck',
        call_type => 'include',
        caller => 'DDG::Spice::FlashVersion'
    ),
);

done_testing;

