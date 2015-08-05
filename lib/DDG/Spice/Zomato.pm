package DDG::Spice::Zomato;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use strict;
use DDG::Spice;

name "Restaurants Search";
source "Zomato";
icon_url "https://www.zomato.com/images/logo/zomato_favicon3.png";
description "Suggest restaurants or places to eat in and around a locality";
primary_example_queries "restaurants in gurgaon", "restaurants in bangalore";
secondary_example_queries "restaurants nearby gurgaon","places to eat in gurgaon","food places in gurgaon";
category "food";
topics "food_and_drink","entertainment","social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zomato.pm";
attribution github => ["Zomato", "Zomato"],
            twitter => "Zomato",
            facebook => "zomato",
            web => ["https://www.zomato.com","Zomato"];


spice is_cached => 0;
spice to => 'http://dheerajavvari.zdev.net/duckduckgo/ddg_api?api_key={{ENV{DDG_SPICE_ZOMATO_APIKEY}}}&q=$1&full_query=$6&lat=$2&lon=$3&lang_code=$4&rtl=$5';
spice from => '([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)/([^/]+)';
spice wrap_jsonp_callback => 1;

my $trigger_string = qr/(restaurants|places to eat|food places?)\s+(in|at|near by|nearby|near)/;
triggers query_lc => qr/($trigger_string)/;

handle query_lc => sub {

    my $full_query = $_;

    # Check for and remove trigger words
    s/\s*$trigger_string\s*//g;
    
    my $query = $_;
    
    return if ($query eq '');
    
   # my $type;
   # if ($query =~ /in|at|near|nearby|near by/) {
   #     $type = "one";
   # } elseif ($query =~ /me|my location/) {
   #     $type = "two";
   # } else {
   #     return;
   # }
    my $locale = '';
    my $rtl = '';
    if (defined $lang->locale) {$locale = $lang->locale};
    if (defined $lang->rtl) {$rtl = $lang->rtl};
    return ($query, $loc->latitude, $loc->longitude, $locale, $rtl, $full_query) if (length $query >= 2);
    return;
};

1;