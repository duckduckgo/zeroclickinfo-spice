package DDG::Spice::Twitch::Featured;
#ABSTRACT: Get Twitch Featured streams info

use strict;
use DDG::Spice;

triggers start => ('twitch featured',
                   'twitchtv featured',
                   'featured twitch',
                   'featured twitchtv');

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/streams/featured?&client_id={{ENV{DDG_SPICE_TWITCHTV_APIKEY}}}&callback={{callback}}';
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return if $_;
};

1;
