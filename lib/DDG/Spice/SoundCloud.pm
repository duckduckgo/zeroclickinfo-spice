package DDG::Spice::SoundCloud;
# ABSTRACT: Audio file search on SoundCloud

use strict;
use DDG::Spice;

spice call_type => 'self';

triggers startend => "sc", "soundcloud", "sound cloud";

handle remainder => sub {
    return if $_ eq '';
    return $_ if $_;
    return;
};

1;
