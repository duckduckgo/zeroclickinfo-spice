#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::IsGDExpander )],
    'http://is.gd/rgHZPL' => test_spice(
        '/js/spice/is_gdexpander/http/is.gd%2FrgHZPL',
        call_type => 'include',
        caller => 'DDG::Spice::IsGDExpander'
    ),
    'foo is.gd/MBzJbp bar' => test_spice(
        '/js/spice/is_gdexpander/http/is.gd%2FMBzJbp',
        call_type => 'include',
        caller => 'DDG::Spice::IsGDExpander'
    ),
);

done_testing;

