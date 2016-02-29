#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Transit::Switzerland )],
    'next train from basel to bern' => test_spice(
        '/js/spice/transit/switzerland/basel/bern',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::Switzerland'
    ),
    'next train to basel from bern' => test_spice(
        '/js/spice/transit/switzerland/bern/basel',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::Switzerland'
    ),
    'train times from geneva to paris' => test_spice(
        '/js/spice/transit/switzerland/geneva/paris',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::Switzerland'
    ),
    'train times geneva from paris' => test_spice(
        '/js/spice/transit/switzerland/paris/geneva',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::Switzerland'
    ),
    'train schedule zurich airport to lucerne' => test_spice(
        '/js/spice/transit/switzerland/zurich-airp./lucerne',
        call_type => 'include',
        caller => 'DDG::Spice::Transit::Switzerland'
    ),
    (
        'next train from a station that doesnt exist to another' => undef,
        'next train basel to blah station' => undef,
        'train times from basel to paris in the springtime' => undef,
        'train times rail map' => undef
    )
);

done_testing;
