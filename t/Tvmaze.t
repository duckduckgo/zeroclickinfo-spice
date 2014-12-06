#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

my $show = test_spice(
	'/js/spice/tvmaze/show/game%20of%20thrones',
	call_type => 'include',
	caller => 'DDG::Spice::Tvmaze::Show'
);

my $nextepisode = test_spice(
	'/js/spice/tvmaze/nextepisode/game%20of%20thrones',
	call_type => 'include',
	caller => 'DDG::Spice::Tvmaze::Nextepisode'
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Show)],
    
    # core queries
    'game of thrones tv'			=> $show,
    'game of thrones tv show'		=> $show,
   	'game of thrones show'			=> $show,
   	'game of thrones tv series'		=> $show,
   	'game of thrones series'		=> $show,
   	
   	'tv show game of thrones'		=> $show,
   	'tv game of thrones'			=> $show,
   	'tv series game of thrones'		=> $show,
   	'series game of thrones'		=> $show,
   	
   	# non matches
   	'show game of thrones'	=> undef,
   	
   	'tv show'				=> undef,
   	'tv'					=> undef,
   	'show'					=> undef,
   	'tv series'				=> undef,
   	'series'				=> undef
);

ddg_spice_test(
    [qw( DDG::Spice::Tvmaze::Nextepisode)],
    
    # core queries
    'game of thrones next episode'			=> $nextepisode,
    'game of thrones next airdate'			=> $nextepisode,
    'game of thrones upcoming episode'		=> $nextepisode,
    'next episode game of thrones' 			=> $nextepisode,
    'next airdate game of thrones'			=> $nextepisode,
    'next episode for game of thrones'		=> $nextepisode,
    'upcoming episode game of thrones'		=> $nextepisode,
    'next game of thrones episode'			=> $nextepisode,
    'upcoming game of thrones episode'		=> $nextepisode,
    
    # with extra text
    'when is the next game of thrones episode?'			=> $nextepisode,
    'when does the next game of thrones episode air'	=> $nextepisode,
    'when is the next episode for game of thrones'		=> $nextepisode,
    'what is the next airdate from game of thrones'		=> $nextepisode,
    
    # non matches
    'game of thrones'				=> undef,
    'episode'						=> undef,
    'airdate'						=> undef,
    'next airdate'					=> undef,
    'next episode'					=> undef,
    'episode next'					=> undef,
    'upcoming episode'				=> undef,
    'episode upcoming'				=> undef,
    'episode in game of thrones'	=> undef,
);

done_testing;

