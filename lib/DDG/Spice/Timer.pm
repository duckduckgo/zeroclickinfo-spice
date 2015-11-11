package DDG::Spice::Timer;
# ABSTRACT: Shows a countdown timer

use strict;
use DDG::Spice;

triggers startend => ['timer', 'countdown', 'alarm'];
triggers start => ['time', 'timer for'];

spice call_type => 'self';

handle remainder => sub {
    return if lc($req->query_raw) =~ /^time($|[^r ][\S]+$)/;  #filter out queries with like "time" or "Time::Piece"
    return unless /^( ?([\d.]+ ?(m(in((ute)?s?)?)?|s(ec((ond)?s?)?)?|h(ours?)?|hr)|online) ?)+$/ ||
        $_ eq '' ||
        /^( ?((\d{1,2}:)?\d{1,2}:\d{2}) ?)/;
    return '';
};

1;
