#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Editor )],
    'editor' => test_spice(
        '/js/spice/editor/',
        call_type => 'include',
        caller => 'DDG::Spice::Editor',
        
    ),
);

done_testing;

