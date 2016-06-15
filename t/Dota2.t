#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Dota2'
    ],
    'dota2 blink' => test_spice(
        '/js/spice/dota2/blink',
        call_type => 'include',
        caller => 'DDG::Spice::Dota2'
    ),
    'crystal maiden dota 2' => test_spice(
        '/js/spice/dota2/crystal%20maiden',
        call_type => 'include',
        caller => 'DDG::Spice::Dota2'
    ),
    'dota2' => undef,
    'foobar' => undef,
);

done_testing;
