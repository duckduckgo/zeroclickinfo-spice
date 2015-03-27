#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        # This is the name of the Spice will be loaded to test.
        'DDG::Spice::TwitchFeatured'
    ],
    # This is a sample query, just like the user will enter into the DuckDuckGo
    # search box.
    'twitch featured' => test_spice(
        '/js/spice/twitch_featured/',
        call_type => 'include',
        caller => 'DDG::Spice::TwitchFeatured',
        is_cached => 0
    ),
);

done_testing;
