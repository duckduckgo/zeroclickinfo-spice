package DDG::Spice::MinecraftStatus;
# ABSTRACT: Returns the status of Minecraft

use DDG::Spice;

name "Minecraft Status";
source "help.mojang.com";
description "Gives the current status of Minecraft";
primary_example_queries "is minecraft down", "why is minecraft not working";
category 'special';
topics 'words_and_games';
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/MinecraftStatus.pm";
attribution web     => ['https://thedestruc7i0n.ca', "Colin D'Souza"],
			twitter => ['https://www.twitter.com/TheDestruc7i0n',"Colin D'Souza"],
    		github  => ['destruc7i0n', "Colin D'Souza"];

triggers any => 'why is minecraft down', 'minecraft status', 'mcstatus';

spice to => 'http://direct.thedestruc7i0n.ca/mcstatusraw';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return 1;
};

1;
