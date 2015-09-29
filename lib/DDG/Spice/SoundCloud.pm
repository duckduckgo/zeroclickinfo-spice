package DDG::Spice::SoundCloud;
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

spice call_type => 'self';

triggers startend => "sc", "soundcloud", "sound cloud";

handle remainder => sub {
    return if $_ eq '';
    return $_ if $_;
    return;
};

1;
