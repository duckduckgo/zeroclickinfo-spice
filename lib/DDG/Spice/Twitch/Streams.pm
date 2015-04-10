<<<<<<< HEAD:lib/DDG/Spice/Twitch/Streams.pm
package DDG::Spice::Twitch::Streams;
=======
package DDG::Spice::TwitchStreams;
# ABSTRACT: Search for gaming videos

>>>>>>> a19f5a064da6861a1d5167f42e90c935c70d53af:lib/DDG/Spice/TwitchStreams.pm
use strict;
use DDG::Spice;

name "Streams";
source "http://www.twitch.tv";
description "Get Twitch Stream info";
primary_example_queries "twitch streams dota 2";
category "special";
topics "special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Twitch/Streams/Streams.pm";
attribution github => ["https://github.com/dwaligon", "Jason O'Donnell"];

triggers startend => ('twitch streams',
<<<<<<< HEAD:lib/DDG/Spice/Twitch/Streams.pm
		              'streams twitch',
   		              'twitch.tv streams',
              	      'twitchtv streams',
=======
                      'streams twitch',
                      'twitch.tv streams',
                      #'twitch tv streams',
                      'twitchtv streams',
>>>>>>> a19f5a064da6861a1d5167f42e90c935c70d53af:lib/DDG/Spice/TwitchStreams.pm
                      'twitchtv streaming',
                      'twitch streaming');

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/search/streams?&q=$1&client_id={{ENV{DDG_SPICE_TWITCHTV_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
