package DDG::Spice::Steam::Specials;
# ABSTRACT: Fetch Steam Specials at Steam store.

use DDG::Spice;

name "steam";
source "http://store.steampowered.com";
description "Get featured games on sale at Steam store";
primary_example_queries "steam specials";
category "special";
topics "gaming","entertainment";
icon_url "/i/store.steampowered.com.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Steam/Specials.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

triggers startend => "steam special", "steam specials", "steam store", "steam offers", "steam offer";
spice to => 'http://store.steampowered.com/api/getappsincategory?category=cat_specials$1';
spice proxy_cache_valid => "200 60m";
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return '';
};	
1;
