#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use_ok('DDG::Spice::JrDevJobs');

ddg_spice_test(
    [qw( DDG::Spice::JrDevJobs )],
    'jrdevjobs ruby on rails' => test_spice(
        '/js/spice/jr_dev_jobs/duckduckgo',
        call_type => 'include',
        caller => 'DDG::Spice::JrDevJobs'
    )
);


done_testing;
