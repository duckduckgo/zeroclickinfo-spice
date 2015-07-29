package DDG::Spice::Zomato;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use strict;
use DDG::Spice;

# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 0;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Zomato";
source "Zomato";
icon_url "https://www.zomato.com/images/logo/zomato_favicon3.png";
description "Suggest restaurants or places to eat in and around a locality";
primary_example_queries "restaurants in", "places to eat in","food places in";
secondary_example_queries "restaurants nearby","nearby places to eat","food places nearby";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "food";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
topics "food_and_drink","entertainment","social";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Zomato.pm";
attribution github => ["Zomato", "Zomato"],
            twitter => "Zomato",
            facebook => "zomato",
            web => ["https://www.zomato.com","Zomato.com"];

spice to => 'http://dheerajavvari.zdev.net/duckduckgo_api.php?loc=$1&callback={{callback}}';

spice wrap_jsonp_callback => 1;

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers start => "restaurants in", "places to eat in","restaurants at", "places to eat at";
triggers end => "restaurants","food palces","food courts";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

   # return unless $_;    # Guard against "no answer"

    my $query = lc $_;
    $query =~ s/\?//;
    
    return $query if $query;
    return;
};

1;