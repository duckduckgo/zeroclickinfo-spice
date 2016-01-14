#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Doi )],
    '10.1063/1.3701566' => test_spice(
        '/js/spice/doi/10.1063%2F1.3701566',
        call_type => 'include',
        caller => 'DDG::Spice::Doi'
    ),
    '10.1038/nphys1170' => test_spice(
        '/js/spice/doi/10.1038%2Fnphys1170',
        call_type => 'include',
        caller => 'DDG::Spice::Doi'
    ),
    'DOI:10.5524/100005' => test_spice(
        '/js/spice/doi/10.5524%2F100005',
        call_type => 'include',
        caller => 'DDG::Spice::Doi'
    ),
    'doi 10.5524/100005' => test_spice(
        '/js/spice/doi/10.5524%2F100005',
        call_type => 'include',
        caller => 'DDG::Spice::Doi'
    ),
);

done_testing;
