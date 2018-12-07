#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::BitbucketStatus)],
    'bitbucket status' => test_spice(
        '/js/spice/bitbucket_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'bitbucket system status' => test_spice(
        '/js/spice/bitbucket_status/system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'bitbucket up' => test_spice(
        '/js/spice/bitbucket_status/up',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'bitbucket system up' => test_spice(
        '/js/spice/bitbucket_status/system%20up',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'bitbucket system down' => test_spice(
        '/js/spice/bitbucket_status/system%20down',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'is bitbucket system status' => test_spice(
        '/js/spice/bitbucket_status/is%20system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'is bitbucket down' => test_spice(
        '/js/spice/bitbucket_status/is%20down',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'status of bitbucket' => test_spice(
        '/js/spice/bitbucket_status/status%20of',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'system status of bitbucket' => test_spice(
        '/js/spice/bitbucket_status/system%20status%20of',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'bb status' => test_spice(
        '/js/spice/bitbucket_status/status',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'is bb system status' => test_spice(
        '/js/spice/bitbucket_status/is%20system%20status',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'system down of bb' => test_spice(
        '/js/spice/bitbucket_status/system%20down%20of',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'about bitbucket' => undef,
    'what is bitbucket' => undef
);

done_testing;
