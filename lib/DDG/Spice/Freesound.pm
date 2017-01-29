package DDG::Spice::Freesound;

use DDG::Spice;

triggers startend => "freesound", "free sound", "free sound of", "sound for free";

spice to => 'http://www.freesound.org/api/sounds/search/?p=1&q=$1&s=rating_desc&sounds_per_page=5&api_key=261399cb1d2b4dc28e11d289be0b5ea2&callback={{callback}}';

primary_example_queries "freesound dog";
description "Search for free sound";
name "Freesound";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Freesound.pm";
icon_url "/i/freesound.org.ico";
topics "music", "social", "entertainment", "everyday";
category "special"; #not sure what

attribution github => ['https://github.com/adman','Adman'],
            twitter => ['http://twitter.com/adman_X','adman_X'];
status "enabled";

handle remainder => sub {
    return $_ if defined $_;
};

1;
