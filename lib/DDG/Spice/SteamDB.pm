package DDG::Spice::SteamDB;

use DDG::Spice;

name "SteamDB";
source "SteamDB";
description "Get matching games from SteamDB";
primary_example_queries "steamdb team fortress";
category "special";
topics "gaming";
icon_url "/i/store.steampowered.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SteamDB.pm";
attribution github => ["https://github.com/xPaw", "xPaw"],
            twitter => ["https://twitter.com/thexpaw", "xPaw"];

triggers startend => "steamdb", "steam game", "steam app", "steam appid", "steam games";

spice to => 'http://steamdb.info/api/GetMetadata/?search=$1&jsonp={{callback}}';

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
