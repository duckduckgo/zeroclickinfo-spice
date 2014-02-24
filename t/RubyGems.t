#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RubyGems )],
    'cucumber rubygem' => test_spice(
        '/js/spice/ruby_gems/cucumber',
        call_type => 'include',
        caller => 'DDG::Spice::RubyGems'
    ),
);

done_testing;

