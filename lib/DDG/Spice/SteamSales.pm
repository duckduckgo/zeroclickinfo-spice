package DDG::Spice::SteamSales;
# ABSTRACT: Fetch featured games on sale at Steam store.

use DDG::Spice;

name "SteamSales";
source "http://store.steampowered.com";
description "Get featured games on sale at Steam store";
primary_example_queries "steam store sale";
category "special";
topics "gaming","entertainment";
icon_url "/i/store.steampowered.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SteamSales.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

triggers startend => "steam sale", "steam sales", "steam store", "steam special", "steam offers", "steam specials", "steam offer";

spice to => 'http://store.steampowered.com/api/featured';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_;
};	
1;
