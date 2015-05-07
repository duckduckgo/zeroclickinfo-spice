#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::TLDs)],
    
    '.us tld' => test_spice(
        '/js/spice/tlds',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
        
        
        
    ),
    
    '.in tld' => test_spice(
        '/js/spice/tlds',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
        
        
        
    ),
    
    '.com tld' => test_spice(
        '/js/spice/tlds',
        call_type => 'include',
        caller => 'DDG::Spice::TLDs'
       
        
        
    ),
    
    '.iamanidiotweirdtld tld' => undef,
);

done_testing;

