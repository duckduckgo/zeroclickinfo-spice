#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(
        DDG::Spice::Dictionary::Definition
    )],
    'define superfluous' => test_spice(
        '/js/spice/dictionary/definition/superfluous',
        call_type => 'include',
        caller => 'DDG::Spice::Dictionary::Definition'
    ),
    'meaning of test' => test_spice(
        '/js/spice/dictionary/definition/test',
        call_type => 'include',
        caller => 'DDG::Spice::Dictionary::Definition'
    ),
    'define define' => test_spice(
        '/js/spice/dictionary/definition/define',
        call_type => 'include',
        caller => 'DDG::Spice::Dictionary::Definition'
    ),
    'define "round robin"' => test_spice(
        '/js/spice/dictionary/definition/round%20robin',
        call_type => 'include',
        caller => 'DDG::Spice::Dictionary::Definition'
    )
);

alt_to_test('DDG::Spice::Dictionary::Definition', [qw(
	audio
	hyphenation
	reference
	pronunciation)]
);

done_testing;

