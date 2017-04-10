package DDG::Spice::MinecraftUUID;

# ABSTRACT: Converts the name of a Minecraft account into a unique id

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;

# Caching - http://docs.duckduckhack.com/backend-reference/api-reference.html#caching
spice is_cached => 1;
spice proxy_cache_valid => '200 204 1d';

spice wrap_jsonp_callback => 1;

# API endpoint - http://docs.duckduckhack.com/walkthroughs/forum-lookup.html#api-endpoint
spice to => 'https://api.mojang.com/users/profiles/minecraft/$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'minecraft uuid', 'mcuuid';

# Handle statement
handle remainder => sub {
    
    return if !$_;
    
    # We return here, because a name may not contain a whitespace
    return if index($_, ' ') >= 0;
    
    # We return here, because a name must consist of 3-16 characters
    return if length($_) < 3 || length($_) > 16;
    
    # We return here, because no special characters are allowed except the underscore
    return if $_ =~ /[^A-Za-z0-9_]/g;
    
    return $_;
};

1;
