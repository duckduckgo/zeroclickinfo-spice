#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Twitch::ChannelInfo)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'twitch starladder' => test_spice(
        '/js/spice/twitch_channel_info/query',
        call_type => 'include',
        caller => 'DDG::Spice::Twitch::ChannelInfo'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
);

done_testing;