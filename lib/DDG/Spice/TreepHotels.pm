package DDG::Spice::TreepHotels;

use DDG::Spice;

triggers startend => 'hotels', 'hotels in', 'hotel in', 'city break';

spice to => 'http://www.treep.io/api/spice/?api_key={{ENV{DDG_SPICE_HOTELS_APIKEY}}}&location=$1';

spice wrap_jsonp_callback => 1;

primary_example_queries "hotels in amsterdam";
description "Compare hotel prices from multiple travel websites.";
name "TreepHotels";
topics "travel";
category "physical_properties";
code_url "https://github.com/mirceasoaica/zeroclickinfo-spice/blob/master/lib/DDG/Spice/TreepHotels.pm";
attribution twitter => "mirceasoaica",
            github  => ["mirceasoaica", "Mircea Soaica"],
            web     => ['http://www.mirceasoaica.com', 'Mircea Soaica'];
source "treep.io";
icon_url "http://www.treep.io/assets/fav.png";
status "enabled";

handle remainder => sub {
    return $_ if $_;
    return;
};

1;