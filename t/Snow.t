#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Snow )],
    'is it snowing?' => test_spice(
        '/js/spice/snow/Phoenixville%2C%20%20Pennsylvania%2C%20%20United%20States',
        call_type => 'include',
        caller => 'DDG::Spice::Snow',
    ),
    'is it snowing in new york?' => test_spice(
    	'/js/spice/snow/new%20york',
    	call_type => 'include',
    	caller => 'DDG::Spice::Snow',
    )
);

done_testing;

