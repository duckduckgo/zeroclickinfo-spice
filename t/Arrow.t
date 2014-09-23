#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Arrow )],
    'arrow bav99' => test_spice(
        '/js/spice/arrow/bav99',
        call_type => 'include',
        caller => 'DDG::Spice::Arrow'
    ),
    'arrow lm324n' => test_spice(
        '/js/spice/arrow/lm324n',
        call_type => 'include',
        caller => 'DDG::Spice::Arrow'
    ),
);

done_testing;

