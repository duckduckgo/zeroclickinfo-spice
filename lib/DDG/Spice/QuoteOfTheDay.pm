package DDG::Spice::QuoteOfTheDay;

# ABSTRACT: Displays the quote for the day using Quotes REST API by TheySaidSo

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;
spice to => 'http://quotes.rest/qod.json';

triggers start => 'quote of the day','quote for the day';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return if $_; # bail out because there is a remainder
    return '';    #return an empty string to make API call
};

1;
