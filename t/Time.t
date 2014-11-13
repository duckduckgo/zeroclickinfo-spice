#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice proxy_cache_valid => "418 1d";

ddg_spice_test(
    [qw( DDG::Spice::Time)],
     'time Amsterdam' => test_spice(
         '/js/spice/time/amsterdam%20netherlands',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
     ),
     'time Netherlands' => test_spice(
         '/js/spice/time/amsterdam%20netherlands',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
     ),
      'time Birmingham' => test_spice(
         '/js/spice/time/birmingham',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
     ),
      'time Birmingham, AL' => test_spice(
         '/js/spice/time/birmingham%20al',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
     ),
      'time Canada' => test_spice(
         '/js/spice/time/ottawa%20canada',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
     ),
     'time in London' => test_spice(
        '/js/spice/time/london%20united%20kingdom',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'time in kingston' => test_spice(
        '/js/spice/time/kingston%20jamaica',
        call_type => 'include',
        caller => 'DDG::Spice::Time'
    ),
     'curent time in kingston' => test_spice(
         '/js/spice/time/curent%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'local time in kingston' => test_spice(
         '/js/spice/time/local%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'current local time in kingston' => test_spice(
         '/js/spice/time/current%20local%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'what is the time in kingston' => test_spice(
         '/js/spice/time/what%20is%20the%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'what\'s the time in kingston' => test_spice(
         '/js/spice/time/whats%20the%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'whats the current local time in kingston' => test_spice(
         '/js/spice/time/whats%20the%20current%20local%20time%20in%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'local time for kingston' => test_spice(
         '/js/spice/time/local%20time%20for%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
     'local time of kingston' => test_spice(
         '/js/spice/time/local%20time%20of%20kingston',
         call_type => 'include',
         caller => 'DDG::Spice::Time'
    ),
);

done_testing;

