#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

#for location testing
use DDG::Test::Location;
use DDG::Request;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Medicine)],
    DDG::Request->new(
        query_raw => "aspirin dosage",
        location => test_location("de")
    ) => test_spice(
        '/js/spice/medicine/aspirin%20dosage/DE',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine',
    ),
    'aspirin dosage' => test_spice(
    
        '/js/spice/medicine/aspirin%20dosage/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin leaflet' => test_spice(
    
        '/js/spice/medicine/aspirin%20leaflet/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin information leaflet' => test_spice(
    
        '/js/spice/medicine/aspirin%20information%20leaflet/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin insert' => test_spice(
    
        '/js/spice/medicine/aspirin%20insert/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin technical document' => test_spice(
    
        '/js/spice/medicine/aspirin%20technical%20document/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin posology' => test_spice(
    
        '/js/spice/medicine/aspirin%20posology/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin side effects' => test_spice(
    
        '/js/spice/medicine/aspirin%20side%20effects/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin contraindications' => test_spice(
    
        '/js/spice/medicine/aspirin%20contraindications/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin active ingredients' => test_spice(
    
        '/js/spice/medicine/aspirin%20active%20ingredients/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
     'dosage aspirin' => test_spice(
    
        '/js/spice/medicine/dosage%20aspirin/US',
        call_type => 'include',
        caller => 'DDG::Spice::Medicine'
    ),
    'aspirin' => undef,
);

done_testing;

