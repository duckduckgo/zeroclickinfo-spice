#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::CountryCapital)],
    #Single Word Country Names
    'india capital' => test_spice(
        '/js/spice/country_capital/india',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'brazil capital' => test_spice(
        '/js/spice/country_capital/brazil',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'capital of india' => test_spice(
        '/js/spice/country_capital/india',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'capital of brazil' => test_spice(
        '/js/spice/country_capital/brazil',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'what is the capital of brazil' => test_spice(
        '/js/spice/country_capital/brazil',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    
    #Multiple Word Country Names
    'new zealand capital' => test_spice(
        '/js/spice/country_capital/new%20zealand',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'south korea capital' => test_spice(
        '/js/spice/country_capital/south%20korea',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'capital of south korea' => test_spice(
        '/js/spice/country_capital/south%20korea',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    'what is the capital of south korea' => test_spice(
        '/js/spice/country_capital/south%20korea',
        call_type => 'include',
        caller => 'DDG::Spice::CountryCapital'
    ),
    
    'india captal' => undef,
);

done_testing;

