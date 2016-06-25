package DDG::Spice::Twitch::ChannelInfo;
#ABSTRACT: Get Twitch Channel Info

use strict;
use DDG::Spice;

triggers startend => 'twitch', 'twitchtv';

#Make call to twitch api
spice to => 'https://api.twitch.tv/kraken/channels/$1';
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;