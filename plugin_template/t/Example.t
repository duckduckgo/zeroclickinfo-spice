#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::%plugin_name )],
    'example test' => test_spice(
        '/js/spice/ruby_gems/cucumber',
        call_type => 'include',
        caller => 'DDG::Spice::%plugin_name'
    )
);

done_testing;

