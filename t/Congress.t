#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Congress )],
    'ny representatives' => test_spice(
        '/js/spice/congress/legislators%2F/house/NY/%20/%20/%20/%20/%20',
        call_type => 'include',
        caller => 'DDG::Spice::Congress'
    ),
    'new york senators' => test_spice(
        '/js/spice/congress/legislators%2F/senate/NY/%20/%20/%20/%20/%20',
        caller => 'DDG::Spice::Congress',
    ),
    'florida representatives' => test_spice(
        '/js/spice/congress/legislators%2F/house/FL/%20/%20/%20/%20/%20',
        caller => 'DDG::Spice::Congress',
    ),
    'house california' => test_spice(
        '/js/spice/congress/legislators%2F/house/CA/%20/%20/%20/%20/%20',
        caller => 'DDG::Spice::Congress',
    ),
    'representative from 55812' => test_spice(
        '/js/spice/congress/legislators%2Flocate/%20/%20/zip/55812/%20/%20/%20',
        caller => 'DDG::Spice::Congress',
    ),
    'senator from pa' => test_spice(
        '/js/spice/congress/legislators%2F/senate/PA/%20/%20/%20/%20/%20',
        caller => 'DDG::Spice::Congress',
    ),
);

done_testing;
