package DDG::Spice::SoundCloudTags;
# ABSTRACT: Audio file search on SoundCloud

use strict;
use DDG::Spice;

description "Displays audio from SoundCloud";
name "SoundCloud";
primary_example_queries "soundcloud MGMT";
secondary_example_queries "sc the new yorker";
topics "entertainment", "music";
category "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SoundCloud.pm";
attribution web => ['http://jordanscales.com', 'Jordan Scales'],
            email => ['scalesjordan@gmail.com', 'Jordan Scales'],
            github => ['http://github.com/jdan', 'Jordan Scales'],
            twitter => ['http://twitter.com/jdan', 'Jordan Scales'];

spice to => 'https://api.soundcloud.com/tracks.json?client_id={{ENV{DDG_SPICE_SOUNDCLOUD_APIKEY}}}&q=$1&limit=35&callback={{callback}}&filter=streamable&tags=$2';
spice from => '(.+?)/(.+)';

triggers startend => "///***never trigger***///";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
