package DDG::Spice::SoundCloud;
# ABSTRACT: Audio file search on SoundCloud

use strict;
use DDG::Spice;

spice call_type => 'self';

spice alt_to => {
	sound_cloud_result => {
		to => 'https://api.soundcloud.com/tracks.json?client_id={{ENV{DDG_SPICE_SOUNDCLOUD_APIKEY}}}&q=$1&limit=35&filter=streamable'
	},
	sound_cloud_stream => {
		to => 'https://duckduckgo.com/audio/?u=https://$1?client_id={{ENV{DDG_SPICE_SOUNDCLOUD_APIKEY}}}'
	}
};

triggers startend => "sc", "soundcloud", "sound cloud";

handle remainder => sub {
    return if $_ eq '';
    return $_ if $_;
    return;
};

1;
