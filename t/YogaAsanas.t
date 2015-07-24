#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

spice is_cached => 1;

binmode STDOUT, ':utf8';

ddg_spice_test(
    ['DDG::Spice::YogaAsanas'],
    'ashtanga primary series' => test_spice(
        '/js/spice/yoga_asanas/%22ashtanga%20primary%20series%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    ),
    'Nāḍi Śodhana' => test_spice(
        '/js/spice/yoga_asanas/%22N%C4%81%E1%B8%8Di%20%C5%9Aodhana%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    ),
    'uttanasana' => test_spice(
        '/js/spice/yoga_asanas/%22uttanasana%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    ),
    'Samasthitih' => test_spice(
        '/js/spice/yoga_asanas/%22Samasthitih%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    ),
    'surya namaskara a' => test_spice(
        '/js/spice/yoga_asanas/%22surya%20namaskara%20a%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    ),
    'finishing sequence' => test_spice(
        '/js/spice/yoga_asanas/%22finishing%20sequence%22~10',
        call_type => 'include',
        caller => 'DDG::Spice::YogaAsanas'
    )
);

done_testing;
