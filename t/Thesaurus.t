#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Thesaurus )],
    'synonym for search' => test_spice(
        '/js/spice/thesaurus/search/synonym',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
);

done_testing;

