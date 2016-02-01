#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Clojars)],
    'clojure instaparse' => test_spice(
        '/js/spice/clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    ),
    'clojure lib instaparse' => test_spice(
        '/js/spice/clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    ),
    'clojure library instaparse' => test_spice(
        '/js/spice/clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    ),
    'clojars instaparse' => test_spice(
        '/js/spice/clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    ),
    'clojure package instaparse' => test_spice(
        '/js/spice/clojars/instaparse',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    ),
    'clojure lib cascalog incanter' => test_spice(
        '/js/spice/clojars/cascalog%22-%22incanter',
        call_type => 'include',
        caller => 'DDG::Spice::Clojars'
    )
);

done_testing;
