#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

ddg_spice_test(
    [qw( DDG::Spice::IsItUp )],
    'is duckduckgo.com up' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    ),
    'is http://duckduckgo.com up?' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    ),
    'is http://duckduckgo.com online' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    ),
    'http://duckduckgo.com status???????????' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    ),
    'is http://duckduckgo.com down?' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        call_type => 'include',
        caller => 'DDG::Spice::IsItUp',
    ),
    'schema.org update time' => undef,
    # unfortunately, the isitup.com api does not
    # currently support unicode or ssl
#     'is føtex.dk up?' => undef,
#     'is https://føtex.dk up?' => undef,
    'is it up?' => undef,
    'is it down' => undef,
    'is site up' => undef,
    'is site down?' => undef,
   'is reddit.com working?' => test_spice(
        '/js/spice/is_it_up/reddit.com',
        caller    => 'DDG::Spice::IsItUp',
    ),
    'is https://twitch.tv up??' => test_spice(
        '/js/spice/is_it_up/twitch.tv',
        caller    => 'DDG::Spice::IsItUp',
    ),
);

done_testing;

