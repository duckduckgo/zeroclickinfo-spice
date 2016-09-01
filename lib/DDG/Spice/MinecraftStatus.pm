package DDG::Spice::MinecraftStatus;
# ABSTRACT: Returns the status of Minecraft

use strict;
use DDG::Spice;

triggers any => 'minecraft', 'mcstatus', 'mc', 'mine craft';

spice to => 'https://status.mojang.com/check';
spice wrap_jsonp_callback => 1;

spice is_cached => 1;
spice proxy_cache_valid => '200 5m';

handle remainder => sub {
    return $_ if /^(is\s*)?(system)?\s*(status|up|down)\?*$/i;
    return;
};

1;
