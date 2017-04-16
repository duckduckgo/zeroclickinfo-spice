#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Trakt::Show )],
    
    # TV series
    'CSI tv shows' => test_spice(
        '/js/spice/trakt/show/search/shows/CSI',
        call_type => 'include',
        caller => 'DDG::Spice::Trakt::Show'
    ),

    'Dexter tv show' => test_spice(
        '/js/spice/trakt/show/search/shows/Dexter',
        call_type => 'include',
        caller => 'DDG::Spice::Trakt::Show'
    ),

    'trending tv shows' => test_spice(
        '/js/spice/trakt/show/shows/trending/nil',
        call_type => 'include',
        caller => 'DDG::Spice::Trakt::Show'
    ),
);

done_testing;

