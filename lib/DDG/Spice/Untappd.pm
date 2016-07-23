package DDG::Spice::Untappd;

# ABSTRACT: Discover your favorite beers

use DDG::Spice;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://api.untappd.com/v4/search/beer?' .
                'client_id={{ENV{DDG_SPICE_UNTAPPD_CLIENT_ID}}}&' .
                'client_secret={{ENV{DDG_SPICE_UNTAPPD_CLIENT_SECRET}}}&' .
                'q=$1';

triggers any => 'untappd';
triggers end => qw/
    ale apa ipa aipa dipa bipa porter stout bitter barleywine
    saison lambik dubbel tripel quadrupel framboise gueuze kriek witbier
    altbier weissbier dunkelweizen gose
    hefeweizen kristalweizen roggenbier weizenbock
    weissbier marzen dunkel weizenbier
    bock doppelbock rauchbier schwarzbier
    maibock eisbock kellerbier kolsch zoigl
    lager pilsner
    happoshu
    sahti
/;

handle query_lc => sub {
    return if $_ =~ /^\S*$/;
    $_ =~ s/\buntappd\b//g;
    $_ =~ s/\s\s/ /g;
    return trim($_);
};

1;
