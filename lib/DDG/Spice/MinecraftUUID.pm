package DDG::Spice::MinecraftUUID;

# ABSTRACT: Converts the name of a Minecraft account into a unique id

use DDG::Spice;
use strict;
use warnings;

# Caching - We cache the response, because the account name can only be changed every 30 days
spice is_cached => 1;
spice proxy_cache_valid => '200 204 1d';

# The Mojang API does not provide a JSONP support, that's why we activate this
spice wrap_jsonp_callback => 1;

# More information about the API: http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time
spice to => 'https://api.mojang.com/users/profiles/minecraft/$1';

# Triggers
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
