package DDG::Spice::Timer;
# ABSTRACT: Shows a countdown timer

use strict;
use DDG::Spice;

my @triggers = qw(timer countdown alarm);
triggers startend => @triggers;

spice call_type => 'self';

handle remainder => sub {
    my $qry = $_;
    my $raw = lc($req->query_raw);
    my $trgx = join('|', @triggers);

    # Verify that the trigger words are wrapped with whitespace or that
    # the trigger is at the start or end of the string with white space
    # on either side of it. This prevents triggering on queries such as
    # "countdown.js", "timer.x", "five-alarm", etc
    if($raw !~ /(^|\s)($trgx)(\s|$)/) {
        return;
    }

    # When the query is empty and we know that the trigger word matches
    # the trigger exactly (whitespace check) we can return a valid result
    if($qry eq '') {
        return '';
    }

    # Trim both sides of the raw query to have the raw regex work
    # properly. Since we need to make sure /^<trigger> for $/ doesn't
    # trigger.
    $raw =~ s/^\s+//;
    $raw =~ s/\s+$//;

    # Parse the raw query to remove common terms. This allows us to
    # catch the more specific queries and handle them. We also strip
    # the extra bounding whitespace. Keep in mind that the trigger is
    # set to startend, causing "online timer for ..." to not trigger.
    #
    # WARNING: Keep a required space after "for", forcing there to be
    # additional text for the timer, or "timer online for" will trigger.
    #
    # Matches on...
    # <specific time> online <trigger> ------- 10 minute online timer
    # <trigger> online <specific time> ------- timer online 10 minutes
    # <trigger> online for <specific time> --- timer online for 10 min
    $raw =~ s/\s*(online )?($trgx)( online)?( for )?\s*//;

    if($raw eq '') {
        return '';
    }elsif($raw =~ /^(\s?([\d.]+ ?(m(in((ute)?s?)?)?|s(ec((ond)?s?)?)?|h(ours?)?|hr))\s?)+$/) {
        return '';
    }elsif($raw =~ /^( ?((\d{1,2}:)?\d{1,2}:\d{2}) ?)/) {
        return '';
    }

    return;
};

1;
