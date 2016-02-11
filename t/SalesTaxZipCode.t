#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SalesTaxZipCode)],
    # At a minimum, be sure to include tests for all:
    # - primary_example_queries
    # - secondary_example_queries
    'sales tax for 08534' => test_spice(
        '/js/spice/sales_tax_zip_code/08534',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxZipCode'
    ),
    'sales tax for 10011' => test_spice(
        '/js/spice/sales_tax_zip_code/10011',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxZipCode'
    ),
    'sales tax for 08540' => test_spice(
        '/js/spice/sales_tax_zip_code/08540',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTaxZipCode'
    ),
    # Try to include some examples of queries on which it might
    # appear that your answer will trigger, but does not.
    'sales tax for 085344' => undef,
    'sales tax for abcde' => undef,
    'sales tax for PA' => undef,
);
done_testing;

