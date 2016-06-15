#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::SalesTax )],
    'sales tax for pennsylvania' => test_spice(
        '/js/spice/sales_tax/PA',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'what is sales tax for mississippi' => test_spice(
        '/js/spice/sales_tax/MS',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'what is the sales tax in kansas' => test_spice(
        '/js/spice/sales_tax/KS',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'sales tax pa' => test_spice(
        '/js/spice/sales_tax/pa',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'sales tax connecticut' => test_spice(
        '/js/spice/sales_tax/CT',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'sales tax delaware' => test_spice(
        '/js/spice/sales_tax/DE',
        call_type => 'include',
        caller => 'DDG::Spice::SalesTax',
    ),
    'sales tax in japan'               => undef,
    'what is the sales tax in china'   => undef,
    'sales tax in connecticut what is' => undef
  );
done_testing;