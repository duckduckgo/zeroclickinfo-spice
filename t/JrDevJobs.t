#!/usr/bin/env perl
use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::JrDevJobs'
    ],
    'jrdevjobs ruby' => test_spice(
        '/js/spice/jr_dev_jobs/ruby',
        call_type => 'include',
        caller => 'DDG::Spice::JrDevJobs',
        is_cached => 1
    ),
    'web developer jrdevjobs' => test_spice(
        '/js/spice/jr_dev_jobs/web',
        call_type => 'include',
        caller => 'DDG::Spice::JrDevJobs',
        is_cached => 1
    )
);

done_testing;
