#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Twitter::User )],
    'twitter duckduckgo' => test_spice(
        '/js/spice/twitter/user/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::Twitter::User'
    ),
);

done_testing;

