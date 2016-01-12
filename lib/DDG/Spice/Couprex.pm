package DDG::Spice::Couprex;

# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;

my @triggers = ("coupon", "promo code", "discount coupon", "discount code", "promotional code", "deal", "discount");
push (@triggers, map {$_."s"} @triggers);
push (@triggers, map {"$_ for"} @triggers);
push (@triggers, "coupon mountain");

triggers any => @triggers;

spice to => 'http://couprex.com/?json=get_search_results&search=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
