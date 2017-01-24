package DDG::Spice::Manga;

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 30d";
spice to => 'http://kitsu.io/api/edge/manga?filter[text]=$1&page[limit]=20';

triggers startend => 'manga', 'kitsu';
spice wrap_jsonp_callback => 1;

my @stops = ("wallpaper", "girl", "freak", "eye", "game", "news", "network",
    "character", "couple", "cat", "cosplay", "chibi", "creator", "art",
    "avatar", "picture");
my $stops_qr = join "|", @stops;

handle remainder => sub {
    return if $_ =~ m/^($stops_qr)s?$/g;

    return $_ if $_;
    return;
};

1;
