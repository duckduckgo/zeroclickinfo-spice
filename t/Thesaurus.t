#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Thesaurus )],
    'synonym for search' => test_spice(
        '/js/spice/thesaurus/search/synonym',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'synonym forget' => test_spice(
        '/js/spice/thesaurus/forget/synonym',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'synonyms for forget' => test_spice(
        '/js/spice/thesaurus/forget/synonym',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'antonyms for forget' => test_spice(
        '/js/spice/thesaurus/forget/antonym',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'similar words to expose' => test_spice(
        '/js/spice/thesaurus/expose/similar',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'related words to corruption' => test_spice(
        '/js/spice/thesaurus/corruption/related',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'beautiful thesaurus' => test_spice(
        '/js/spice/thesaurus/beautiful/synonym',
        caller => 'DDG::Spice::Thesaurus'
    ),
);

done_testing;

