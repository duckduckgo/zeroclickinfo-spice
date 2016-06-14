#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SalesTaxHoliday)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
   'sales tax holiday for PA' => test_spice(
        '/js/spice/sales_tax_holiday/PA',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxHoliday',
    ),
   'sales tax holiday for pennsylvania' => test_spice(
        '/js/spice/sales_tax_holiday/PA',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxHoliday',
    ),
   'sales tax holiday for Alabama' => test_spice(
        '/js/spice/sales_tax_holiday/AL',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxHoliday',
    ),
   'sales tax holiday for MO' => test_spice(
        '/js/spice/sales_tax_holiday/MO',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxHoliday',
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'bad example query' => undef,
   'sales tax holiday for MOO' => undef,
   'holiday tax in NY' => undef,
   'holiday sales tax in washingtondc' => undef,
   'free sales tax in PA' => undef
);
done_testing;