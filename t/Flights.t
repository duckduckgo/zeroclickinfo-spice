#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

# get the current UTC time, minus six hours
my ($second, $minute, $hour, $dayOfMonth,
    $month, $year, $dayOfWeek, $dayOfYear, $daylightSavings) = gmtime(time - 21600);

    $year += 1900;
    $month += 1;

# if these tests are run when the hour changes between when the script samples
# the current time and when the script runs the tests below, the tests will break
#
# also, if we rerun the scraper, these tests may need to be updated to reflect
# the new list of active airports and city codes
#
# can we convert the date portion of the comparison string to regex, using
# something like this:
# qr/\/js\/spice\/flights\/route\/CPA\/LAX\/HKG\/LAX\/HKG\/[0-9]{4}\/([0-9]{1}|[0-9]{2})\/([0-9]{1}|[0-9]{2})\/([0-9]{1}|[0-9]{2})/;

ddg_spice_test(

    [qw( DDG::Spice::Flights::Route )],

    # --- these queries should trigger the IA

    # standard query
    'Cathay Pacific Los Angeles to Hong Kong Airport' => test_spice(
        "/js/spice/flights/route/CPA/LAX/HKG/LAX/HKG/$year/$month/$dayOfMonth/$hour/los%2Bangeles/hong%2Bkong",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    # standard query
    'Jetblue Boston to Los Angeles' => test_spice(
        "/js/spice/flights/route/JBU/BOS/LAX/BOS/LAX/$year/$month/$dayOfMonth/$hour/boston/los%2Bangeles",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    # standard query by airport code
    'Jetblue BOS to LAX' => test_spice(
        "/js/spice/flights/route/JBU/BOS/LAX/BOS/LAX/$year/$month/$dayOfMonth/$hour/bos/lax",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    # query with airline at the end
    # 'Newark to Paris United' => test_spice(
    #    "/js/spice/flights/route/UBD%2CUAL/EWR/BVA%2CCDG%2CORY/EWR/BVA/$year/$month/$dayOfMonth/$hour",
    #    call_type => 'include',
    #    caller => 'DDG::Spice::Flights::Route',
    # ),

    # query by airport code with airline at the end
    'BOS to LAX Aer Lingus' => test_spice(
        "/js/spice/flights/route/EIN/BOS/LAX/BOS/LAX/$year/$month/$dayOfMonth/$hour/bos/lax",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    # query that generates multiple potential airline matches
    # 'American Boston to Los Angeles' => test_spice(
    #    "/js/spice/flights/route/AAL%2CALC/BOS/LAX/BOS/LAX/$year/$month/$dayOfMonth/$hour",
    #    call_type => 'include',
    #    caller => 'DDG::Spice::Flights::Route',
    # ),

    # query by mixed city/airport code
    'Jetblue Boston to JFK' => test_spice(
        "/js/spice/flights/route/JBU/BOS/JFK/BOS/JFK/$year/$month/$dayOfMonth/$hour/boston/jfk",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    'Jetblue JFK to Boston' => test_spice(
        "/js/spice/flights/route/JBU/JFK/BOS/JFK/BOS/$year/$month/$dayOfMonth/$hour/jfk/boston",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    'Boston to JFK Jetblue' => test_spice(
        "/js/spice/flights/route/JBU/BOS/JFK/BOS/JFK/$year/$month/$dayOfMonth/$hour/boston/jfk",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    'JFK to Boston Jetblue' => test_spice(
        "/js/spice/flights/route/JBU/JFK/BOS/JFK/BOS/$year/$month/$dayOfMonth/$hour/jfk/boston",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    'Delta Dallas-Fort Worth International Airport to LAX' => test_spice(
        "/js/spice/flights/route/DAL/DFW/LAX/DFW/LAX/$year/$month/$dayOfMonth/$hour/dallas%2Bfort%2Bworth/lax",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route'
    ),

    'delta dallas fort worth to lax' => test_spice(
        "/js/spice/flights/route/DAL/DFW/LAX/DFW/LAX/$year/$month/$dayOfMonth/$hour/dallas%2Bfort%2Bworth/lax",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route'
    ),
    
    'Jetblue flights from JFK to Boston' => test_spice(
        "/js/spice/flights/route/JBU/JFK/BOS/JFK/BOS/$year/$month/$dayOfMonth/$hour/jfk/boston",
        call_type => 'include',
        caller => 'DDG::Spice::Flights::Route',
    ),

    # --- these queries should not trigger the IA

    # without "to", we cannot determine the source and destination
    'Boston Paris Aer Lingus' => undef,

    # the airline must appear at the beginning or the end
    'Boston Aer Lingus to Paris' => undef,

    # currently, we do not parse queries with "from" in between cities
    'Boston from Los Angeles Jetblue' => undef,

    'Boston' => undef,
    'Jetblue' => undef,
    'Boston Paris' => undef,
);

alt_to_test('DDG::Spice::Flights::Route', ['route_helper']);

done_testing;
