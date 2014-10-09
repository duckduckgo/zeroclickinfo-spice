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
# qr\/js\/spice\/flights\/CPA\/LAX\/HKG\/[0-9]{4}\/([0-9]{1}|[0-9]{2})\/([0-9]{1}|[0-9]{2})\/([0-9]{1}|[0-9]{2})/;

ddg_spice_test(

    [qw( DDG::Spice::Flights )],
    
    # --- these queries should trigger the IA

    # standard query
    'Cathay Pacific Los Angeles to Hong Kong' => test_spice(
        "/js/spice/flights/CPA/LAX/HKG/$year/$month/$dayOfMonth/$hour",
        call_type => 'include',
        caller => 'DDG::Spice::Flights',
    ),

    # standard query
    'Jetblue Boston to Los Angeles' => test_spice(
        "/js/spice/flights/JBU/BOS/LAX/$year/$month/$dayOfMonth/$hour",
        call_type => 'include',
        caller => 'DDG::Spice::Flights',
    ),

    # query with airline at the end
    'Boston to Paris Aer Lingus' => test_spice(
        "/js/spice/flights/EIN/BOS/PAR/$year/$month/$dayOfMonth/$hour",
        call_type => 'include',
        caller => 'DDG::Spice::Flights',
    ),

    # query that generates multiple potential airline matches
    'American Boston to Los Angeles' => test_spice(
        "/js/spice/flights/AAL%2CALC/BOS/LAX/$year/$month/$dayOfMonth/$hour",
        call_type => 'include',
        caller => 'DDG::Spice::Flights',
    ),

    # query with multiple white spaces
    'Jetblue     Boston     to   Los     Angeles' => test_spice(
        "/js/spice/flights/JBU/BOS/LAX/$year/$month/$dayOfMonth/$hour",
        call_type => 'include',
        caller => 'DDG::Spice::Flights',
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

done_testing;
