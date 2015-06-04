package DDG::Spice::SoundCloudResult;
# ABSTRACT: Audio file search on SoundCloud

use strict;
use DDG::Spice;

spice to => 'http://api.soundcloud.com/tracks.json?client_id={{ENV{DDG_SPICE_SOUNDCLOUD_APIKEY}}}&q=$1&limit=35&filter=streamable';

triggers startend => "//***never trigger***//";

handle remainder => sub {
    return if $_ eq '';
    return $_ if $_;
    return;
};

1;