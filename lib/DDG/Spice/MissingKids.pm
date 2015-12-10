package DDG::Spice::MissingKids;

use DDG::Spice;

# meta data                                                                                                                                           
primary_example_queries "missing kids";
secondary_example_queries "missing children";
description "Shows missing children from your state if you are located in the US.";
name "Missing Kids";
code_url "https://github.com/brianrisk";
topics "social";
category "location_aware";
attribution github => ['https://github.com/brianrisk','Brian Risk'],
            email => ['brian@geneffects.com','Brian Risk'],
            web => ["https://www.geneffects.com", "Geneffects"],
            twitter => "brianrisk";

# defining our triggers                                                                                                                               
triggers start => "missing kid", "missing kids", "missing child", "missing children";

# set spice parameters
spice to => 'https://duckduckgo.com/x.js?u=http://www.missingkids.com/missingkids/servlet/XmlServlet?act=rss&LanguageCountry=en_US&orgPrefix=NCMC&state=$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {
    return unless defined $loc->country_code 
        && $loc->country_code eq 'US'
        && defined $loc->region;
        
    # return two-letter state
    return $loc->region;
};

1;