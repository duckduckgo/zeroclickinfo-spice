#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::%(plugin_name)s)],
    'example test' => test_spice(
        '/js/spice/$ia_name/',
        call_type => 'include',
        caller => 'DDG::Spice:$ia_name'
    )
);

done_testing;

