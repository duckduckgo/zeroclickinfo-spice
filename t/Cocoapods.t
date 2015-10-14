#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Cocoapods)],
   
    'cocoapods test' => test_spice(
        '/js/spice/cocoapods/test',
        call_type => 'include',
        caller => 'DDG::Spice::Cocoapods'
    ),
    'cocoapods afnetworking' => test_spice(
        '/js/spice/cocoapods/afnetworking',
        call_type => 'include',
        caller => 'DDG::Spice::Cocoapods'
    ),
    'cocoapods SVProgressHUD' => test_spice(
        '/js/spice/cocoapods/svprogresshud',
        call_type => 'include',
        caller => 'DDG::Spice::Cocoapods'
    ),
    'cocoapods AFNetworking for ios' => test_spice(
        '/js/spice/cocoapods/afnetworking%20for%20ios',
        call_type => 'include',
        caller => 'DDG::Spice::Cocoapods'
    ),
   
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'cocoapod test afnetworking' => undef,
    'pod afnetworking' => undef,
);

done_testing;

