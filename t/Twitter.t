#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Twitter )],
    'twitter duckduckgo' => test_spice(
        '/js/spice/twitter/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter'
    ),
);

done_testing;

