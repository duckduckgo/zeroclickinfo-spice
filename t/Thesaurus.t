#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Thesaurus )],
    
    # Tests for trigger word 'synonym[s]'
    
    'synonym forget' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'synonym for search' => test_spice(
        '/js/spice/thesaurus/search',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),   
    'synonym of happy' => test_spice(
        '/js/spice/thesaurus/happy',
        caller    => 'DDG::Spice::Thesaurus',
    ),
    'synonyms forget' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'synonyms for search' => test_spice(
        '/js/spice/thesaurus/search',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),   
    'synonyms of happy' => test_spice(
        '/js/spice/thesaurus/happy',
        caller    => 'DDG::Spice::Thesaurus',
    ),
    'forget synonym' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'happy synonyms' => test_spice(
        '/js/spice/thesaurus/happy',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    
    # Tests for trigger word 'antonym[s]'
    
    'antonym forget' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),    
    'antonym for search' => test_spice(
        '/js/spice/thesaurus/search',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'antonym of happy' => test_spice(
        '/js/spice/thesaurus/happy',
        caller    => 'DDG::Spice::Thesaurus',
    ),    
    'antonyms forget' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'antonyms for search' => test_spice(
        '/js/spice/thesaurus/search',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),   
    'antonyms of happy' => test_spice(
        '/js/spice/thesaurus/happy',
        caller    => 'DDG::Spice::Thesaurus',
    ),
    'forget antonym' => test_spice(
        '/js/spice/thesaurus/forget',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    'happy antonyms' => test_spice(
        '/js/spice/thesaurus/happy',
        call_type => 'include',
        caller => 'DDG::Spice::Thesaurus'
    ),
    
    # Tests for trigger word 'thesaurus'
    
    'thesaurus forget' => test_spice(
        '/js/spice/thesaurus/forget',
        caller    => 'DDG::Spice::Thesaurus',
    ),
    
    'happy thesaurus' => test_spice(
        '/js/spice/thesaurus/happy',
        caller    => 'DDG::Spice::Thesaurus',
    ),
    
    # Tests that shouldn't trigger the IA

    'synonym firstword secondword' => undef,
    'firstword synonym secondword' => undef,
    'firstword secondword synonym ' => undef,
    
    'synonyms firstword secondword' => undef,
    'firstword synonyms secondword' => undef,
    'firstword secondword synonyms' => undef,
    
    'antonym firstword secondword' => undef,
    'firstword antonym secondword' => undef,
    'firstword secondword antonym' => undef,
    
    'antonyms firstword secondword' => undef,
    'firstword antonyms secondword' => undef, 
    'firstword secondword antonyms' => undef,
    
    'thesaurus firstword secondword' => undef,
    'firstword thesaurus secondword' => undef, 
    'firstword secondword thesaurus' => undef,
    
    'synonym' => undef,
    'synonyms' => undef,
    'antonym' => undef,
    'antonyms' => undef,
    'thesaurus' => undef,
    
    'synonym of' => undef,
    'synonyms of' => undef,
    'antonym of' => undef,
    'antonyms of' => undef,
    'thesaurus of' => undef,
    
    'synonym for' => undef,
    'synonyms for' => undef,
    'antonym for' => undef,
    'antonyms for' => undef,
    'thesaurus for' => undef,
    
    'similar words to expose' => undef,    
    'related words to corruption' => undef,
    'similar words to miniature' => undef,
);

done_testing;

