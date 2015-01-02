#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Keybase)],
    'keybase jbx' => test_spice(
        '/js/spice/keybase/jbx',
        call_type => 'include',
        caller => 'DDG::Spice::Keybase'
    ),
    'keybase' => undef,
);

done_testing;

