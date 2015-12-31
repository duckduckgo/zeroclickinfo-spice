package DDG::Spice::Timer;
# ABSTRACT: Shows a countdown timer

use strict;
use DDG::Spice;

name 'Timer';
description 'Displays a countdown timer';
primary_example_queries 'timer';
category 'special';
topics 'everyday', 'science', 'words_and_games';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Timer.pm';
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

my @triggers = qw(timer countdown alarm);
triggers startend => @triggers;

spice call_type => 'self';

handle remainder => sub {
    my $qry = $_;
    my $raw = lc($req->query_raw);
    my $trgx = join('|', @triggers);

    # check to make sure the query matches a trigger perfectly
    if($qry eq '' && in_array($raw, @triggers)) {
        return $qry;
    }

    # makes sure trigger is wrapped with whitespace
    if($raw !~ /(^|\s)($trgx)(\s|$)/) {
        return;
    }

    $raw =~ s/\s*(online )?($trgx)( online)?( for )?\s*//;

    if($raw eq '') {
        return $raw;
    }elsif($raw =~ /^(\s?([\d.]+ ?(m(in((ute)?s?)?)?|s(ec((ond)?s?)?)?|h(ours?)?|hr))\s?)+$/) {
        return $raw;
    }elsif($raw =~ /^( ?((\d{1,2}:)?\d{1,2}:\d{2}) ?)/) {
        return $raw;
    }

    return;
};


sub in_array {
    my($needle, @haystack) = @_;

    for(@haystack) {
        if($_ eq $needle) {
            return 1;
        }
    }

    return 0;
}

1;
