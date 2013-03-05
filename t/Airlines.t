#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Airlines::Airlines DDG::Spice::Airlines::Airlines2 )],
    'aa 102' => test_spice(
        '/js/spice/airlines/airlines2/AA/102',
        call_type => 'include',
        caller => 'DDG::Spice::Airlines::Airlines2',
    ),
    '102 aa' => test_spice(
    	'/js/spice/airlines/airlines/AA/102',
    	call_type => 'include',
    	caller => 'DDG::Spice::Airlines::Airlines',
    )
);

done_testing;

