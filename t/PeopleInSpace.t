#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw(DDG::Spice::PeopleInSpace)],

    'people in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'people in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'people are in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'people are in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans are in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'humans are in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'astronauts in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'astronauts in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'astronauts are in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'astronauts are in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'cosmonauts in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'cosmonauts in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'cosmonauts are in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'cosmonauts are in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'number of astronauts in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'number of cosmonauts in orbit right now' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'who\'s in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'who\'s in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'who is in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'who is in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'anyone in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'anyone in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'whose in space' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'whose in orbit' => test_spice(
        '/js/spice/people_in_space/1',
        call_type => 'include',
        caller => 'DDG::Spice::PeopleInSpace'
    ),
    'Lost in Space' => undef
);

done_testing;

