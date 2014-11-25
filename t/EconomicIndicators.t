#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::EconomicIndicators)],

    # - primary_example_queries
    'what is the per capita income of china' => test_spice(
        '/js/spice/economic_indicators/CHN%2Findicators%2FNY.GNP.PCAP.PP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'per capita income, japan' => test_spice(
        '/js/spice/economic_indicators/JPN%2Findicators%2FNY.GNP.PCAP.PP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'what is the growth rate of indonesia' => test_spice(
        '/js/spice/economic_indicators/IDN%2Findicators%2FNY.GDP.MKTP.KD.ZG',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'malaysia growth rate' => test_spice(
        '/js/spice/economic_indicators/MYS%2Findicators%2FNY.GDP.MKTP.KD.ZG',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'gdp of india' => test_spice(
        '/js/spice/economic_indicators/IND%2Findicators%2FNY.GDP.MKTP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'sri lanka gdp' => test_spice(
        '/js/spice/economic_indicators/LKA%2Findicators%2FNY.GDP.MKTP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    # question marks
    'what is the gross domestic product of singapore?' => test_spice(
        '/js/spice/economic_indicators/SGP%2Findicators%2FNY.GDP.MKTP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    # some aliases
    'gdp of antigua' => test_spice(
        '/js/spice/economic_indicators/ATG%2Findicators%2FNY.GDP.MKTP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'per capita income of st vincent' => test_spice(
        '/js/spice/economic_indicators/VCT%2Findicators%2FNY.GNP.PCAP.PP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    'usa gdp' => test_spice(
        '/js/spice/economic_indicators/USA%2Findicators%2FNY.GDP.MKTP.CD',
        call_type => 'include',
        caller => 'DDG::Spice::EconomicIndicators',
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'india growth' => undef,
    'china income' => undef,
);

done_testing;

