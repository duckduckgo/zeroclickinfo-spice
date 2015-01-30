package DDG::Spice::Hearthstone;
# ABSTRACT: Retrieve the card infos from Hearthstone game.

use DDG::Spice;

# Caching
spice is_cached => 1;
spice proxy_cache_valid => "200 4d";

# Metadata
name "Hearthstone Card Search";
source "Bytevortex (Gamepedia Proxy)";
icon_url "http://eu.battle.net/hearthstone/static/images/icons/favicon.ico";
description "Get a preview of any Hearthstone card.";
primary_example_queries "hearthstone leeroy jenkins", "hearthstone leeroy", "leeroy hearthstone", "hearthstone mirror";
category "entertainment";
topics "gaming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hearthstone.pm";
attribution github => ["https://github.com/Akryum", "Akryum"],
            twitter => "Akryum";

# Triggers
triggers startend => "hearthstone";

# Target URL
spice to => 'http://bytevortex.net/hearthstone.php?search=$1';

# JS Callback
spice wrap_jsonp_callback => 1;

# Keyword blacklist
my $keyword_guard = qr/game|instruction|stoves|warcraft|deck|forum|wiki|reddit/;

# Handle statement
handle remainder => sub {
    
    # Guard against "no answer"
    return unless $_;
    
    # Keyword Blacklist
    return if (/$keyword_guard/);
    
    # Regex guard
    # Allows string similar to any Hearthstone card name: multiple words separated by spaces, commas or dashes.
    # The card name may also have dots, double dots, slashes or an exclamation mark (Those Blizzard devs).
    return $_ if (/^([a-z0-9':!\/,.-]+\s*)+$/i);
    
    return;
};

1;
