#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Keybase)],
    'keybase jbx' => test_spice(
        '/js/spice/keybase/username/jbx',
        call_type => 'include',
        caller => 'DDG::Spice::Keybase'
    ),
    'keybase username:jbx' => test_spice(
        '/js/spice/keybase/username/jbx',
        call_type => 'include',
        caller => 'DDG::Spice::Keybase'
    ),
    'keybase twitter:jeresig' => test_spice(
        '/js/spice/keybase/twitter/jeresig',
        call_type => 'include',
        caller => 'DDG::Spice::Keybase'
    ),
    'keybase reddit:mwolny' => test_spice(
        '/js/spice/keybase/reddit/mwolny',
        call_type => 'include',
        caller => 'DDG::Spice::Keybase'
    ),
    'keybase' => undef,
);

done_testing;

