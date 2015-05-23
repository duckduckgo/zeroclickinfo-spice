#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::TLDs)],
    
    '.us tld' => test_spice(
        '/js/spice/tlds/.us',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
        
        
        
    ),
    
    '.in tld' => test_spice(
        '/js/spice/tlds/.in',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
        
        
        
    ),
    
    '.photography tld' => test_spice(
        '/js/spice/tlds/.photography',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
       
        
        
    ),
    
    
);

done_testing;
