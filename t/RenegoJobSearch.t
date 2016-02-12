#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

use DDG::Test::Location;
use DDG::Request;

ddg_spice_test(
    [qw(DDG::Spice::RenegoJobSearch)],
    DDG::Request->new(
        query_raw => "manager berlin job",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/manager%20berlin/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "manager berlin jobs",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/manager%20berlin/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler stellenanzeige",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler stellenanzeigen",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler jobsuche",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler stellenangebot",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler stellenangebote",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler stellenmarkt",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
    DDG::Request->new(
        query_raw => "entwickler karriere",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/renego_job_search/entwickler/M%C3%B6nchengladbach',
        call_type => 'include',
        caller => 'DDG::Spice::RenegoJobSearch'
    ),
);

done_testing;

