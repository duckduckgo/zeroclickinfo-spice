#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::CodeDay)],
    'codeday near me' => test_spice(
        '/js/spice/code_day/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'when is codeday?' => test_spice(
        '/js/spice/code_day/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'codeday' => test_spice(
        '/js/spice/code_day/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),

    'hs programming event' => undef,
    'day of code' => undef,
    'code-day' => undef,
);

done_testing;

