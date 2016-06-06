package DDG::Spice::Couprex;

# ABSTRACT: Couprex coupon, discount and deal search

use DDG::Spice;

spice is_cached => 1;

my @triggers = ("coupon", "coupon code", "promo code", "discount coupon", "discount code", "promotional code");

push (@triggers, map {$_."s"} @triggers);
push (@triggers, map {"$_ for"} @triggers);

triggers any => @triggers;

my @stopwords = qw( retailmenot amazon ebay );
my $stopwords_re = join ('|', @stopwords);

spice to => 'http://couprex.com/?json=get_search_results&search=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    s/\bfree\b//;
    return if m/\b$stopwords_re\b/;
    return $_ if $_;
    return;
};

1;
