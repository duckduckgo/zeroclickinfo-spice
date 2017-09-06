#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::TermsOfService)],
    'terms of service duckduckgo' => test_spice(
        '/js/spice/terms_of_service/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::TermsOfService'
    ),
    'summary tos twitter' => test_spice(
        '/js/spice/terms_of_service/twitter',
        call_type => 'include',
        caller => 'DDG::Spice::TermsOfService'
    ),
    'terms for citizenship of the united states' => undef,
);

done_testing;

