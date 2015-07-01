#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Drupal)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'drupal token' => test_spice(
        '/js/spice/drupal/token',
        call_type => 'include',
        caller => 'DDG::Spice::Drupal'
    ),
    'Drupal tOKen' => test_spice(
        '/js/spice/drupal/tOKen',
        call_type => 'include',
        caller => 'DDG::Spice::Drupal'
    ),
    'drupal ctools' => test_spice(
        '/js/spice/drupal/ctools',
        call_type => 'include',
        caller => 'DDG::Spice::Drupal'
    ),
    'DRUPAL CTOOLS' => test_spice(
        '/js/spice/drupal/CTOOLS',
        call_type => 'include',
        caller => 'DDG::Spice::Drupal'
    )
);

done_testing;

