#!/usr/bin/env perl
#@xe.com
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
    	'DDG::Spice::Currency'
    ],
    'cad usd' => test_spice(
        '/js/spice/currency/1/cad/usd',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    ),
    '499 usd = ? cad' => test_spice(
    	'/js/spice/currency/499/usd/cad',
    	call_type => 'include',
    	caller => 'DDG::Spice::Currency',
    	is_cached => 0
    ),
    'convert 1021 gbp to cny' => test_spice(
        '/js/spice/currency/1021/gbp/cny',
        call_type => 'include',
        caller => 'DDG::Spice::Currency',
        is_cached => 0
    )
);

done_testing;

