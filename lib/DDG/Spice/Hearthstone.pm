package DDG::Spice::Hearthstone;
# ABSTRACT: Retrieve the card infos from Hearthstone game.

use DDG::Spice;

# Caching
spice is_cached => 1;
spice proxy_cache_valid => "200 4d";

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
