package DDG::Spice::Anime;

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 30d";
spice to => 'http://kitsu.io/api/edge/anime?filter[text]=$1&page[limit]=20&fields[anime]=slug,synopsis,canonicalTitle,averageRating,posterImage,episodeCount,episodeLength';

spice headers => { Accept => 'application/vnd.api+json',
                   'Content-Type' => 'application/vnd.api+json'
                 };

triggers startend => 'anime', 'kitsu';
spice wrap_jsonp_callback => 1;

my @stops = ("wallpaper", "girl", "freak", "eye", "game", "news", "network",
    "character", "couple", "cat", "cosplay", "chibi", "creator", "art",
    "avatar", "picture", "currently airing");
my $stops_qr = join "|", @stops;

handle remainder => sub {
    return if $_ =~ m/^($stops_qr)s?$/g;

    return $_ if $_;
    return;
};

1;
