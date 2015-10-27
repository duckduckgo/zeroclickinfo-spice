package DDG::Spice::TodayInHistory;
# ABSTRACT: Shows relevant historic events for the current day in previous years

use strict;
use DDG::Spice;
use DateTime;
use Date::Parse;
use DateTime::Format::Natural;

name "TodayInHistory";
source "http://wikipedia.com";
description "List of events which occured on this day in history";
primary_example_queries "today in history", "this day in history";
secondary_example_queries "historical events on 27 June";
category "dates";
topics "everyday","trivia";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TodayInHistory.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'https://en.wikipedia.org/w/api.php?action=query&titles=$1&prop=revisions&rvlimit=1&rvprop=content&format=json&redirects&callback={{callback}}';

triggers startend => "today in history";
triggers start => "historical events on", "this day in history";

handle remainder => sub {

    my $dateString = shift;
    my $dt = DateTime->now;

    # no date specified
    # use today's date
    unless ($dateString){
        return unless $loc && $loc->time_zone;
        $dt->set_time_zone($loc->time_zone);
        return $dt->mday."_".$dt->month_name;
    }

    # ensure we have a day and month
    # jan 20
    # 01/20/15
    # 2015-20-01
    return unless split (/[-\/. ]/, $dateString) > 1;

    my $parser = DateTime::Format::Natural->new;
    my $date = $parser->parse_datetime($dateString);
    return unless ($parser->success);
    return $date->day."_".$date->month_name;
};
1;