
package DDG::Spice::SoundCloud;

use DDG::Spice;

description "Displays SoundCloud Players";
name "SoundCloud";
primary_example_queries "soundcloud Jetski Safari Like a Lie";
secondary_example_queries "sc kavinsky";
topics "entertainment", "music";
category "entertainment";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SoundCloud.pm";
attribution web => ['http://jordanscales.com', 'Jordan Scales'],
            email => ['scalesjordan@gmail.com', 'Jordan Scales'],
            github => ['http://github.com/prezjordan', 'prezjordan'],
            twitter => ['http://twitter.com/prezjordan', '@prezjordan'];
status "enabled";

spice to => 'http://api.soundcloud.com/tracks.json?client_id={{ENV{DDG_SPICE_SOUNDCLOUD_APIKEY}}}&q=$1&limit=5&callback={{callback}}';
spice is_cached => 0;

triggers startend => "sc", "soundcloud", "sound cloud";

handle remainder => sub {
    return if $_ eq '';
    return $_ if defined $_;
    return;
};

1;
