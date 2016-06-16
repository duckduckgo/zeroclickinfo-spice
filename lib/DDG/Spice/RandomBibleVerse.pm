package DDG::Spice::RandomBibleVerse;

# ABSTRACT: Displays a random bible verse every 5 minutes

use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 5m";

spice wrap_jsonp_callback => 1;
spice to => 'http://labs.bible.org/api/?passage=random&type=json';

triggers start => 'bible verse','random bible verse';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return if $_; # bail out because there is a remainder
    return '';    #return an empty string to make API call
};

1;