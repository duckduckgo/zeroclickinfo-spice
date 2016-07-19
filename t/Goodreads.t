#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [ 
        "DDG::Spice::Goodreads" 
    ],
    
    # Successful query : author
    'goodreads book by kafka' => test_spice(
        '/js/spice/goodreads/authors-kafka',
        call_type => 'include',
        caller => 'DDG::Spice::Goodreads'
    ),
    
    # Using gr and books 'on'
    'books on India gr' => test_spice(
        '/js/spice/goodreads/title-india',
        call_type => 'include',
        caller => 'DDG::Spice::Goodreads'
    ),
    
    # Using 'about' and topic
    'book about Subhash Bose goodreads' => test_spice(
        '/js/spice/goodreads/title-subhash%20bose',
        call_type => 'include',
        caller => 'DDG::Spice::Goodreads'
    ),
    
    # List of books in the trigger
    'list of books about Independence goodreads' => test_spice(
        '/js/spice/goodreads/title-independence',
        call_type => 'include',
        caller => 'DDG::Spice::Goodreads'
    ),
    
    # If other things are specified the spice might not give result as expected. Eg:
    'famous books by kafka gr' => test_spice(
        '/js/spice/goodreads/authors-famous%20kafka', # This query will yeild no result
        call_type => 'include',
        caller => 'DDG::Spice::Goodreads'
    ),
);

done_testing;