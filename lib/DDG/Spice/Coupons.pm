package DDG::Spice::Coupons;

# ABSTRACT: Returns coupon codes for various online-shops from sparheld.de

use DDG::Spice;

# Caching - no. the api result is dependent on the locale and the caching is not.
spice is_cached => 0;
spice proxy_cache_valid => "200 2h"; # max 2 hours to keep the number of expired coupons as low as possible

spice wrap_jsonp_callback => 1; # sparheld.de et al only support json and xml, so wrap in callback

# API endpoint
spice to => 'http://api.sparheld.de/partnerAPI/v1?uid=5641ae4cdf06b&format=json&dataKey=coupons&locale=$1&queryString=$2';
spice from => '(.*)/(.*)';

# Triggers - https://duck.co/duckduckhack/spice_triggers
my @coupons_trigger_words = share("coupons_triggers.txt")->slurp(iomode => '<:encoding(UTF-8)');
triggers any => @coupons_trigger_words;

handle remainder => sub {
    return unless $_  and $loc and $loc->country_code;
    my $locale = $loc->country_code;
    #don't act if the locale is not supported by the data source
    return unless (grep {$locale eq $_} qw( DE FR ES IT PL DA SV FI ) );

    return $locale, $_;
};

1;
