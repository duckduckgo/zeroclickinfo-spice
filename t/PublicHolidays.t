#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Request;
use DDG::Test::Spice;
use DDG::Test::Location;

spice is_cached => 1;

my $currentYear = (localtime(time))[5] + 1900;

my @germanyPresent = (
    "/js/spice/public_holidays/de/$currentYear/Germany",
    call_type => 'include',
    caller    => 'DDG::Spice::PublicHolidays'
);

my @australia2018 = (
    '/js/spice/public_holidays/au/2018/Australia',
    call_type => 'include',
    caller    => 'DDG::Spice::PublicHolidays'
);

my @uk2020 = (
    '/js/spice/public_holidays/gb/2020/The%20United%20Kingdom',
    call_type => 'include',
    caller    => 'DDG::Spice::PublicHolidays'
);

my @japan2020 = (
    '/js/spice/public_holidays/jp/2020/Japan',
    call_type => 'include',
    caller    => 'DDG::Spice::PublicHolidays'
);

ddg_spice_test(
    [qw( DDG::Spice::PublicHolidays)],
       
    # Match: <trigger>
    DDG::Request->new(
        query_raw => "public holidays",
        location => test_location("de")
    ) => test_spice(@germanyPresent),
    
    # Match: <trigger> <year>
    DDG::Request->new(
        query_raw => "public holidays 2018",
        location => test_location("au")
    ) => test_spice(@australia2018),   
    DDG::Request->new(
        query_raw => "public holidays in 2018",
        location => test_location("au")
    ) => test_spice(@australia2018),    
    
    # Match: <year> <trigger>
    DDG::Request->new(
        query_raw => "2018 public holidays",
        location => test_location("au")
    ) => test_spice(@australia2018),
    
    # Match: <trigger> <country>
    'public holidays germany'               => test_spice(@germanyPresent),
    'public holidays in germany'            => test_spice(@germanyPresent),
    
    # Match: <country> <trigger>
    'germany national holidays'             => test_spice(@germanyPresent),
    'germany national holidays'             => test_spice(@germanyPresent),
    
    # Match: <trigger> <country> <year>
    'public holidays uk 2020'               => test_spice(@uk2020),
    'public holidays in the uk 2020'        => test_spice(@uk2020),
    'public holidays in the uk in 2020'     => test_spice(@uk2020),
    'public holidays japan 2020'            => test_spice(@japan2020),
    'public holidays in japan 2020'         => test_spice(@japan2020),
    'public holidays in japan in 2020'      => test_spice(@japan2020),
    
    # Match: <trigger> <year> <country>
    'national holidays 2020 uk'             => test_spice(@uk2020),
    'national holidays in 2020 uk'          => test_spice(@uk2020),
    'national holidays in 2020 in the uk'   => test_spice(@uk2020),
    'national holidays 2020 japan'          => test_spice(@japan2020),
    'national holidays in 2020 japan'       => test_spice(@japan2020),
    'national holidays in 2020 in japan'    => test_spice(@japan2020),
    
    # Match: <country> <trigger> <year>
    'uk bank holidays 2020'                 => test_spice(@uk2020),
    'uk bank holidays in 2020'              => test_spice(@uk2020),
    'japan bank holidays 2020'              => test_spice(@japan2020),
    'japan bank holidays in 2020'           => test_spice(@japan2020),
    
    # Match: <country> <year> <trigger>
    'uk 2020 federal holidays'              => test_spice(@uk2020),
    'japan 2020 federal holidays'           => test_spice(@japan2020),
    
    # Match: <year> <trigger> <country>
    '2020 public holidays uk'               => test_spice(@uk2020),
    '2020 public holidays in the uk'        => test_spice(@uk2020),
    '2020 public holidays japan'            => test_spice(@japan2020),
    '2020 public holidays in japan'         => test_spice(@japan2020),
    
    # Match: <year> <country> <trigger>
    '2020 uk national holidays'             => test_spice(@uk2020),
    '2020 japan national holidays'          => test_spice(@japan2020),   
      
    'holidays 2016'                         => undef,    
    'uk public holiday 2016'                => undef,    
    'yuk public holidays 2016'              => undef,    
    'uk usa public holidays 2016'           => undef,    
    'uk public holidays 2016 2017'          => undef,    
    'national park holidays'                => undef,    
    'riverbank holidays'                    => undef,
    'confederal holidays'                   => undef,
    'public holidays are great'             => undef,
);

done_testing;
