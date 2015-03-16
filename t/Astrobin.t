#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::Astrobin::Apod DDG::Spice::Astrobin::Subject)],
    'astronomy picture of the day' => test_spice(
        '/js/spice/astrobin/apod/',
        call_type => 'include',
        caller => 'DDG::Spice::Astrobin::Apod',
    ),
    'astrophoto spica' => test_spice(
        '/js/spice/astrobin/subject/spica',
        call_type => 'include',
        caller => 'DDG::Spice::Astrobin::Subject',
    ),
    'astrophoto image daily' => test_spice(
        '/js/spice/astrobin/apod/',
        call_type => 'include',
        caller => 'DDG::Spice::Astrobin::Apod',
    ),
);

done_testing;

