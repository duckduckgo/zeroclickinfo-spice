#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::OpenSNP )],
    'rs12' => test_spice(
        '/js/spice/open_snp/rs12',
        caller => 'DDG::Spice::OpenSNP',
    ),
    "I am not a SNP" => undef,
    "rsiamnotaSNP" => undef,
    'rs7903146' => test_spice(
        '/js/spice/open_snp/rs7903146',
        caller    => 'DDG::Spice::OpenSNP',
    ),
);
done_testing;
