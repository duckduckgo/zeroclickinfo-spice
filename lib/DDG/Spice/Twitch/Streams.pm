package DDG::Spice::Twitch::Streams;
# ABSTRACT: Search for gaming videos

use strict;
use DDG::Spice;

triggers startend => ('twitch streams',
		      'streams twitch',
   		      'twitch.tv streams',
              	      'twitchtv streams',
                      'twitchtv streaming',
                      'twitch streaming');

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/search/streams?&q=$1&limit=20&client_id={{ENV{DDG_SPICE_TWITCHTV_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
