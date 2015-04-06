package DDG::Spice::TwitchFeatured;
use strict;
use DDG::Spice;

name "TwitchFeatured";
source "http://www.twitch.tv";
description "Get Twitch Featured streams info";
primary_example_queries "twitch featured";
category "special";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TwitchFeatured/TwitchFeatured.pm";
attribution github => ["https://github.com/dwaligon", "Jason O'Donnell"];

triggers start => ('twitch featured',
                   'twitchtv featured',
                   'featured twitch',
                   'featured twitchtv');

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/streams/featured?&client_id={{ENV{DDG_SPICE_TWITCHTV_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return '';
};

1;
