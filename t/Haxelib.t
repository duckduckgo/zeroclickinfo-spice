#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Haxelib )],
    'haxelib openfl' => test_spice(
        '/js/spice/haxelib/openfl',
        call_type => 'include',
        caller => 'DDG::Spice::Haxelib'
    ),
    'nodejs haxe library' => test_spice(
        '/js/spice/haxelib/nodejs',
        call_type => 'include',
        caller => 'DDG::Spice::Haxelib'
    ),
);

done_testing;

