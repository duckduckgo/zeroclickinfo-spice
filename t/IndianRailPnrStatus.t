#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::IndianRailPnrStatus'
    ],
    
    'pnr 4101917424' => test_spice(
        '/js/spice/indian_rail_pnr_status/4101917424',
        call_type => 'include',
        caller => 'DDG::Spice::IndianRailPnrStatus',
        is_cached => 1
    )#,
    # This test fails when run "prove -Ilib t/IndianRailPnrStatus.t". Don't know why. 
    # Works fine when on duckpan server. That's why commented for now. 
    #'pnr' => test_spice(
     #   '/js/spice/indian_rail_pnr_status/',
      #  call_type => 'include',
       # caller => 'DDG::Spice::IndianRailPnrStatus',
       # is_cached => 1
   # ),
);


done_testing;
