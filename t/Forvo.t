#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Forvo )],
    'pronounce duck' => test_spice(
        '/js/spice/forvo/duck/empty',
        call_type => 'include',
        caller => 'DDG::Spice::Forvo',
    ),
    'pronounce cool' => test_spice(
        '/js/spice/forvo/cool/empty',
        caller    => 'DDG::Spice::Forvo',
    ),
    'how to pronounce names' => test_spice(
        '/js/spice/forvo/names/empty',
        caller    => 'DDG::Spice::Forvo',
    ),
    'pronounciation of ask' => test_spice(
        '/js/spice/forvo/ask/empty',
        caller    => 'DDG::Spice::Forvo',
    ),
    'how to say bye' => test_spice(
        '/js/spice/forvo/bye/empty',
        caller    => 'DDG::Spice::Forvo',
    ),
);

done_testing;
