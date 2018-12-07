package DDG::Spice::Twitch::ChannelInfo;
#ABSTRACT: Get Twitch Channel Info

use strict;
use DDG::Spice;

triggers startend => 'twitch', 'twitchtv';

#Make call to twitch api to channel info
spice to => 'https://api.twitch.tv/kraken/channels/$1';
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

#Make call to twitch api to stream info (check is stream status == LIVE)
spice alt_to => {
    stream => {
        proxy_cache_valid => "418 1d",
        to => 'https://api.twitch.tv/kraken/streams/$1'
    }
};

handle remainder => sub {
    return $_ if $_;
    return;
};

1;