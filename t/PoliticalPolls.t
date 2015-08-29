#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use URI::Encode;

my $uri = URI::Encode->new({encode_reserved => 0});

ddg_spice_test(
    [qw( DDG::Spice::PoliticalPolls )],
    # Good examples
    'election polls' => test_spice(
        '/js/spice/political_polls/election',
        call_type => 'include',
        caller => 'DDG::Spice::PoliticalPolls'
    ),
    'us polls' => test_spice(
        '/js/spice/political_polls/us',
        call_type => 'include',
        caller => 'DDG::Spice::PoliticalPolls'
    ),
    # Empty remainder
    'voting' => undef,
    'election' => undef
);

done_testing;
