package DDG::Spice::Hearthstone;
# ABSTRACT: Retrieve the card infos from Hearthstone game.

use DDG::Spice;

spice is_cached => 1;

name "Hearthstone Card Search";
source "Bytevortex (Gamepedia Proxy)";
icon_url "http://eu.battle.net/hearthstone/static/images/icons/favicon.ico";
description "Get a preview of any Hearthstone card.";
primary_example_queries "hearthstone leeroy jenkins", "hearthstone leeroy";
category "entertainment";
topics "gaming";
code_url "https://github.com/Akryum/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Hearthstone.pm";
attribution github => ["https://github.com/Akryum", "Akryum"],
            twitter => "Akryum";

# Triggers
triggers any => "hearthstone";

spice to => 'http://bytevortex.net/hearthstone.php?search=$1';

spice wrap_jsonp_callback => 1;

# Handle statement
handle remainder => sub {

    return unless $_;    # Guard against "no answer"
    
    return $_;
};

1;
