#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Maps::Stay )],
    #start triggers
    'rental in Mumbai' => test_spice(
        '/js/spice/maps/stay/mumbai',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'rental near Boston' => test_spice(
        '/js/spice/maps/stay/boston',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'hotel in Rio de Janeiro' => test_spice(
        '/js/spice/maps/stay/rio%20de%20janeiro',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'hotel near Moscow' => test_spice(
        '/js/spice/maps/stay/moscow',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'hotels in Saint Petersburg' => test_spice(
        '/js/spice/maps/stay/saint%20petersburg',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'hotel near Omsk' => test_spice(
        '/js/spice/maps/stay/omsk',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'apartment in Kharkov' => test_spice(
        '/js/spice/maps/stay/kharkov',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'apartment near Zhmerinka' => test_spice(
        '/js/spice/maps/stay/zhmerinka',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'apartments in Ljubljana' => test_spice(
        '/js/spice/maps/stay/ljubljana',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'apartments near Oslo' => test_spice(
        '/js/spice/maps/stay/oslo',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'accommodation in Lissabon' => test_spice(
        '/js/spice/maps/stay/lissabon',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'accommodation near Kair' => test_spice(
        '/js/spice/maps/stay/kair',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'accommodations in Paris' => test_spice(
        '/js/spice/maps/stay/paris',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'accommodations near Atlanta' => test_spice(
        '/js/spice/maps/stay/atlanta',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    
    #startend triggers
    'rental Shanghai' => test_spice(
        '/js/spice/maps/stay/shanghai',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'Karachi hotel' => test_spice(
        '/js/spice/maps/stay/karachi',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'hotels Beijing' => test_spice(
        '/js/spice/maps/stay/beijing',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'São Paulo hostel' => test_spice(
        '/js/spice/maps/stay/s%C3%83%C2%A3o%20paulo',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'Delhi hostels' => test_spice(
        '/js/spice/maps/stay/delhi',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'Lagos apartment' => test_spice(
        '/js/spice/maps/stay/lagos',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'apartments Istanbul' => test_spice(
        '/js/spice/maps/stay/istanbul',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'Tokyo accommodation' => test_spice(
        '/js/spice/maps/stay/tokyo',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    'accommodations Guangzhou' => test_spice(
        '/js/spice/maps/stay/guangzhou',
        call_type => 'include',
        caller => 'DDG::Spice::Maps::Stay',
        is_cached => 0,
    ),
    
    #Fails
    'moscow' => undef,
    'hotels near me' => undef,
    'accommodations in my city' => undef,
);

done_testing;