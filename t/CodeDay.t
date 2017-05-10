#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 0;

ddg_spice_test(
    [qw( DDG::Spice::CodeDay)],
    'codeday near me' => test_spice(
        '/js/spice/code_day/nearby/%20/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'when is codeday' => test_spice(
        '/js/spice/code_day/nearby/%20/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'codeday' => test_spice(
        '/js/spice/code_day/nearby/%20/40.1246/-75.5385',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'codeday san diego' => test_spice(
        '/js/spice/code_day/search/san%20diego/%20/%20',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'when is codeday san diego' => test_spice(
        '/js/spice/code_day/search/san%20diego/%20/%20',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    'where\'s codeday san diego' => test_spice(
        '/js/spice/code_day/search/san%20diego/%20/%20',
        call_type => 'include',
        caller => 'DDG::Spice::CodeDay'
    ),
    
    # Should these be implemented later?
    'hs programming event' => undef,
    'day of code' => undef
);

done_testing;

