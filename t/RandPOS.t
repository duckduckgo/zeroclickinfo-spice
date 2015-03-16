#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::RandPOS )],
    'random noun' => test_spice(
        '/js/spice/rand_pos/noun/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random verb' => test_spice(
        '/js/spice/rand_pos/verb/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random adverb' => test_spice(
        '/js/spice/rand_pos/adverb/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random adjective' => test_spice(
        '/js/spice/rand_pos/adjective/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random pronouns' => test_spice(
        '/js/spice/rand_pos/pronoun/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random prepositions' => test_spice(
        '/js/spice/rand_pos/preposition/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random conjunctions' => test_spice(
        '/js/spice/rand_pos/conjunction/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example nouns' => test_spice(
        '/js/spice/rand_pos/noun/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example verbs' => test_spice(
        '/js/spice/rand_pos/verb/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example adverbs' => test_spice(
        '/js/spice/rand_pos/adverb/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example adjectives' => test_spice(
        '/js/spice/rand_pos/adjective/5',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example pronoun' => test_spice(
        '/js/spice/rand_pos/pronoun/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example preposition' => test_spice(
        '/js/spice/rand_pos/preposition/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'example conjunction' => test_spice(
        '/js/spice/rand_pos/conjunction/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'adjective example' => test_spice(
        '/js/spice/rand_pos/adjective/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'pronoun example' => test_spice(
        '/js/spice/rand_pos/pronoun/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'preposition example' => test_spice(
        '/js/spice/rand_pos/preposition/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'conjunction example' => test_spice(
        '/js/spice/rand_pos/conjunction/1',
        call_type => 'include',
        caller => 'DDG::Spice::RandPOS',
    ),
    'random noun phrase' => undef,
    'random funny nouns' => undef,
    'bad noun example' => undef,
    'examples of nouns' => undef
);
done_testing;