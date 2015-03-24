package DDG::Spice::TwitchStreams;
use strict;
use DDG::Spice;

name "TwitchStreams";
source "http://www.twitch.tv";
description "Get Twitch Stream info";
primary_example_queries "twitch streams dota 2";
category "special";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TwitchStreams/TwitchStreams.pm";
attribution github => ["https://github.com/dwaligon", "Jason O'Donnell"];

triggers startend => 'twitch streams';

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/search/streams?&q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
