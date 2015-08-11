#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Gravatar )],
    'gravatar matt' => test_spice(
        '/js/spice/gravatar/matt',
        call_type => 'include',
        caller => 'DDG::Spice::Gravatar'
    ),
    'gravatar gravatar@duckduckgo.com' => test_spice(
        '/js/spice/gravatar/a4ef35219b54c904e8af196e142ca9f9',
        call_type => 'include',
        caller    => 'DDG::Spice::Gravatar',
    ),
    'avatar of duckduckhack' => test_spice(
        '/js/spice/gravatar/duckduckhack',
        call_type => 'include',
        caller    => 'DDG::Spice::Gravatar',
    ),
    'altern8tif gravatar' => test_spice(
    '/js/spice/gravatar/altern8tif',
    call_type => 'include',
    caller    => 'DDG::Spice::Gravatar',
    )
);

done_testing;