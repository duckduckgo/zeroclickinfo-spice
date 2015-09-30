#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    ['DDG::Spice::Coderwall'],
    'coderwall jagtalon' => test_spice(
        '/js/spice/coderwall/jagtalon',
        call_type => 'include',
        caller => 'DDG::Spice::Coderwall'
    ),
    'motersen coderwall' => test_spice(
        '/js/spice/coderwall/motersen',
        call_type => 'include',
        caller => 'DDG::Spice::Coderwall'
    ),
    'jagtalon coderwall motersen' => undef
);

done_testing;

