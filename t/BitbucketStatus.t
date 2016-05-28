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
    'bitbucket' => test_spice(
        '/js/spice/bitbucket_status/bitbucket',
        call_type => 'include',
        caller => 'DDG::Spice::BitbucketStatus'
    ),
    'about bitbucket' => undef,
    'what is bitbucket' => undef
);

done_testing;
