#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SalesTax )],
    'sales tax for pennsylvania' => test_spice(
        '/js/spice/sales_tax/17101/Pennsylvania',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ), 
    'what is sales tax for mississippi' => test_spice(
        '/js/spice/sales_tax/39201/Mississippi',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ),   
    'what is the sales tax in kansas' => test_spice(
        '/js/spice/sales_tax/66101/Kansas',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ),     
    'sales tax pa' => test_spice(
        '/js/spice/sales_tax/17101/Pennsylvania',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ),
    'sales tax connecticut' => test_spice(
        '/js/spice/sales_tax/06101/Connecticut',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ),
    'sales tax delaware' => test_spice(
        '/js/spice/sales_tax/19901/Delaware',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax', 
    ),
    'sales tax in japan' => undef,
    'what is the sales tax in china' => undef,
    'sales tax in connecticut what is' => undef
   );
done_testing;