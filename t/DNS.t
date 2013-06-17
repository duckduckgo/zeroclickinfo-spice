#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::DNS )],
    'a record dylansserver.com' => test_spice(
        '/js/spice/dns/A/dylansserver.com',
        call_type => 'include',
        caller => 'DDG::Spice::DNS'
    ),
);

done_testing;

