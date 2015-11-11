package DDG::Spice::Anime;

use strict;
use DDG::Spice;

spice proxy_cache_valid => "200 30d";
spice to => 'http://hummingbird.me/api/v1/search/anime?query=$1';

triggers startend => 'anime', 'hummingbird';
spice wrap_jsonp_callback => 1;

my @stops = qw(wallpaper girl freak eye game news network character couple cat cosplay chibi creator art avatar picture);
my $stops_qr = join "|", @stops;

handle remainder => sub {
    return if $_ =~ m/^($stops_qr)s?$/g;

    return $_ if $_;
    return;
};

1;
