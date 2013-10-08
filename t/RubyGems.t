#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RubyGems )],
    'cucumber rubygem' => test_spice(
        '/js/spice/ruby_gems/cucumber',
        caller => 'DDG::Spice::RubyGems'
    ),
    'ruby xml' => test_spice(
        '/js/spice/ruby_gems/xml',
        caller => 'DDG::Spice::RubyGems'
    ),
);

done_testing;

