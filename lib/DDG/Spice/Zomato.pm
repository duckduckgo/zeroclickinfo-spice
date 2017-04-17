package DDG::Spice::Zomato;

use strict;
use DDG::Spice;

name "Restaurants Search";
source "Zomato";
icon_url "https://www.zomato.com/images/logo/zomato_favicon3.png";
description "Suggest restaurants or places to eat in and around a locality";
primary_example_queries "restaurants in gurgaon", "bars in bangalore";
secondary_example_queries "restaurants nearby gurgaon","places to eat in gurgaon","food places in gurgaon", "pubs in bangalore", "nightclubs in delhi", "night clubs in delhi";
category "food";
topics "food_and_drink","entertainment","social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zomato.pm";
attribution github => ["Zomato", "Zomato"],
            twitter => "Zomato",
            facebook => "zomato",
            web => ["https://www.zomato.com","Zomato"];

spice is_cached => 0;
spice to => 'https://www.zomato.com/duckduckgo/ddg_api?api_key={{ENV{DDG_SPICE_ZOMATO_APIKEY}}}&type=$1&q=$2&lat=$3&lon=$4&lang_code=$5&rtl=$6&full_query=$7';
spice from => '([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)';
spice wrap_jsonp_callback => 1;

my $trigger_string = qr/^(restaurants|places to eat|food places|pubs|nightclubs|night clubs|bars?)\s+(in|at|near by|nearby|near)/;
# triggers query_lc => qr/($trigger_string)/;
triggers start => "restaurants", "places to eat", "food places", "pubs", "night clubs", "nightclubs", "bars";

handle query_lc => sub {

    my $full_query = $_;
    
    if ($full_query =~ $trigger_string) {
    
        my $type = "restaurant";
        if ($full_query =~ /pubs|nightclubs|night clubs/) {
            $type = "pub";
        } elsif ($full_query =~ /bars/) {
            $type = "bar";
        }
    
        # Check for and remove trigger words
        s/\s*$trigger_string\s*//g;
        my $query = $_;
        return if ($query eq '');
        
        my $locale = $lang->locale // '';
        my $rtl = $lang->rtl // '';
        my $lat = $loc->latitude // 0;
        my $long = $loc->longitude // 0;
        return ($type, $query, $lat, $long, $locale, $rtl, $full_query) if (length $query >= 2);
        
    }
    
   # my $type;
   # if ($query =~ /in|at|near|nearby|near by/) {
   #     $type = "one";
   # } elsif ($query =~ /me|my location/) {
   #     $type = "two";
   # } else {
   #     return;
   # }
   
    return;
};

1;