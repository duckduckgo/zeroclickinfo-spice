#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Airlines )],
    'aa 102' => test_spice(
        '/js/spice/airlines/AA/102',
        call_type => 'include',
        caller => 'DDG::Spice::Airlines',
    ),
    '102 aa' => test_spice(
    	'/js/spice/airlines/AA/102',
    	call_type => 'include',
    	caller => 'DDG::Spice::Airlines',
    ),
    'AA 102' => test_spice(
        '/js/spice/airlines/AA/102',
        caller    => 'DDG::Spice::Airlines',
    ),
    'Delta 3684' => test_spice(
        '/js/spice/airlines/DL/3684',
        caller    => 'DDG::Spice::Airlines',
    ),
);

done_testing;

