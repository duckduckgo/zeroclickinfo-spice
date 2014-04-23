#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [ qw(DDG::Spice::DetectLang) ],
    'detect language something' => test_spice(
        '/js/spice/detect_lang/something',
        call_type => 'include',
        caller    => 'DDG::Spice::DetectLang'
    ),
    'detect language こんにちは' => test_spice(
        '/js/spice/detect_lang/%C3%A3%C2%81%C2%93%C3%A3%C2%82%C2%93%C3%A3%C2%81%C2%AB%C3%A3%C2%81%C2%A1%C3%A3%C2%81%C2%AF',
        caller    => 'DDG::Spice::DetectLang',
    ),
    'what language is como estas' => test_spice(
        '/js/spice/detect_lang/como%20estas',
        caller    => 'DDG::Spice::DetectLang',
    ),
);

done_testing;
