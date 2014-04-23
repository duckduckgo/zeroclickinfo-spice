#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Horoscope )],
    'aries horoscope' => test_spice(
            '/js/spice/horoscope/', 
            call_type => 'include',
            caller => 'DDG::Spice::Horoscope'
        )
);

done_testing;