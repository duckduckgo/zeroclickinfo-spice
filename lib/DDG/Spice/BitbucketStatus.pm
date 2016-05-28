package DDG::Spice::BitbucketStatus;
# ABSTRACT: Returns the status of Bitbucket

use DDG::Spice;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => "200 5m";

spice wrap_jsonp_callback => 1;

spice to => 'http://status.bitbucket.org/index.json';

triggers startend => "bitbucket";

handle query_lc => sub {
    my $query = trim($_);
    return $query if $query =~ m/^bitbucket$/; # return if only bitbucket
    $query =~ s/^bitbucket\s+//g; # remove trigger
    return trim($query) if $query =~ m/^(system)?\s*(status|up|down)$/i; # return if query contains (system) status, up or down
    return;
};

1;
