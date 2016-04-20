#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::YodaSpeak)],
   
    'yoda speak you seem to be happy' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'yoda talk you seem to be happy' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'translate to yoda you seem to be happy' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'you seem to be happy to yoda' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'you seem to be happy in yoda' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'you seem to be happy in yodish' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'you seem to be happy to yodish' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'how does yoda say you seem to be happy' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'translate to yodish you seem to be happy' => test_spice(
        '/js/spice/yoda_speak/you%20seem%20to%20be%20happy',
        call_type => 'include',
        caller => 'DDG::Spice::YodaSpeak'
    ),
    
    'yodas yoga' => undef,
    
    'translate to yoga hello' => undef,
    
    'how does yoda perform dance' => undef,
);

done_testing;

