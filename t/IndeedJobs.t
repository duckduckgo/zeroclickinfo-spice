#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::IndeedJobs )],
    'perl jobs in    Austin, TX' => test_spice(
        '/js/spice/indeed_jobs/perl/Austin%2C%20TX/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'perl job in nyc' => test_spice(
        '/js/spice/indeed_jobs/perl/nyc/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'perl jobs' => test_spice(
        '/js/spice/indeed_jobs/perl/Phoenixville%2C%20Pennsylvania/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'perl job' => test_spice(
        '/js/spice/indeed_jobs/perl/Phoenixville%2C%20Pennsylvania/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'jobs in austin' => test_spice(
        '/js/spice/indeed_jobs/%20/austin/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'jobs near austin' => test_spice(
        '/js/spice/indeed_jobs/%20/austin/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'jobs' => test_spice(
        '/js/spice/indeed_jobs/%20/Phoenixville%2C%20Pennsylvania/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'I want java job in Austin' => test_spice(
        '/js/spice/indeed_jobs/java/Austin/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    ),
    'I want a job in Austin' => test_spice(
        '/js/spice/indeed_jobs/%20/Austin/US',
        call_type => 'include',
        caller => 'DDG::Spice::IndeedJobs'
    )
);

done_testing;

