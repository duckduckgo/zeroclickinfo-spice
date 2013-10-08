#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;
use utf8;

ddg_spice_test(
    [qw( DDG::Spice::IsItUp )],
    'is duckduckgo.com up?' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        caller => 'DDG::Spice::IsItUp',
    ),
    'is http://duckduckgo.com up?' => test_spice(
        '/js/spice/is_it_up/duckduckgo.com',
        caller => 'DDG::Spice::IsItUp',
    ),
    # unfortunately, the isitup.com api does not
    # currently support unicode or ssl
    'is føtex.dk up?' => undef,
    'is https://føtex.dk up?' => undef,
);

done_testing;

