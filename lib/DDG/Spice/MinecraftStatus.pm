package DDG::Spice::MinecraftStatus;
# ABSTRACT: Returns the status of Minecraft

use strict;
use DDG::Spice;

name 'Minecraft Status';
source 'help.mojang.com';
description 'Gives the current status of Minecraft';
primary_example_queries 'is minecraft down', 'minecraft status';
category 'special';
topics 'words_and_games';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MinecraftStatus.pm';
attribution
    web     => ['https://thedestruc7i0n.ca', 'destruc7i0n'],
    twitter => ['https://www.twitter.com/TheDestruc7i0n','destruc7i0n'],
    github  => ['destruc7i0n', 'destruc7i0n'];

triggers any => 'minecraft', 'mcstatus', 'mc', 'mine craft';

spice to => 'http://mcstatusraw.thedestruc7i0n.ca/';
spice wrap_jsonp_callback => 1;

spice is_cached => 1;
spice proxy_cache_valid => '200 5m';

handle remainder => sub {
    return $_ if /^(is\s*)?(system)?\s*(status|up|down)\?*$/i;
    return;
};

1;
