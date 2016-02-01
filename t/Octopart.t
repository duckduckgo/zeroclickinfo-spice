#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Octopart )],
    'atmega datasheet' => test_spice(
        '/js/spice/octopart/atmega',
        call_type => 'include',
        caller => 'DDG::Spice::Octopart'
    ),
    'ne555 specs' => test_spice(
        '/js/spice/octopart/ne555',
        call_type => 'include',
        caller => 'DDG::Spice::Octopart'
    ),
);

done_testing;

