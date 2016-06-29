package DDG::Spice::Maps::Stay;
# ABSTRACT: Rental objects on the map by Stay22
# Docs: https://www.stay22.com/embed

use strict;
use DDG::Spice;

triggers start => (
    "rental in", 
    "rental near", 
    "hotel in",
    "hotel near",    
    "hotels in",
    "hotels near",  
    "hostel in",
    "hostel near",    
    "hostels in",
    "hostels near",
    "apartment in",
    "apartment near",
    "apartments in",
    "apartments near",
    "accommodation in", 
    "accommodation near",
    "accommodations in", 
    "accommodations near"
);
triggers startend => (
    "rental", 
    "hotel",
    "hotels",
    "hostel",
    "hostels",
    "apartment",
    "apartments",
    "accommodation",
    "accommodations"
);

# Badwords array.
my @skip_words = ('me', 'my city');

spice is_cached => 0;
spice proxy_cache_valid => "418 1d";
spice wrap_jsonp_callback => 1;

# Endpoint to Mapbox places 
spice to => 'http://api.mapbox.com/v4/geocode/mapbox.places/$1.json?access_token={{ENV{DDG_SPICE_MAPBOX_KEY}}}';

# Handle statement
handle remainder => sub {
    my $query = lc $_;
    
    #Skip if query like 'hotels near me' or 'hotels in my city'. See Badwords array
    return if grep(/^$query$/, @skip_words);
    
    return $query if $query;
    return;
};

1;