#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Video )],
    'youtube.com life round here' => test_spice(
        '/js/spice/video/life%20round%20here',
        call_type => 'include',
        caller => 'DDG::Spice::Video',
    ),
    'youtube life round here' => test_spice(
        '/js/spice/video/life%20round%20here',
        call_type => 'include',
        caller => 'DDG::Spice::Video',
    ),
);

done_testing;

