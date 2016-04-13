package DDG::Spice::Etsy;
# ABSTRACT: Returns etsy product listings for the given keywords

use DDG::Spice;

spice wrap_jsonp_callback => 1;
spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

my $images_projection = join(',', qw(url_170x135 url_570xN));
my $shop_projection = join(',', qw(shop_name title));
my $fields = join(',', qw(title currency_code price url));
my $includes = join(',', (
    "Images($images_projection):1",
    "User(feedback_info)/FeedbackInfo",
    "Shop($shop_projection)",
));

my $query_string = join('&', (
    'api_key={{ENV{DDG_SPICE_ETSY_APIKEY}}}',
    'keywords=$1',
    "includes=$includes",
    "fields=$fields",
));

spice to => "https://openapi.etsy.com/v2/listings/active?${query_string}";

triggers startend => "etsy";

# Handle statement
handle remainder => sub {
    return $_ if $_;
    return;
};

1;
