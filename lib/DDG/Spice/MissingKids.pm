package DDG::Spice::MissingKids;

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

# meta data                                                                                                                                           
primary_example_queries "missing kids";
secondary_example_queries "missing children";
description "Shows missing children from your state if you are located in the US.";
name "Missing Kids";
code_url "https://duckduckgo.com";
topics "social";
category "location_aware";
attribution github => ['https://github.com/brianrisk','Brian Risk'],
            email => ['brian@geneffects.com','Brian Risk'],
            web => ["https://www.geneffects.com", "Geneffects"],
            twitter => "brianrisk";

# defining our triggers                                                                                                                               
my @triggers = ('missing child', 'missing kid');
triggers start => @triggers;

# set spice parameters
spice to => 'https://duckduckgo.com/x.js?u=http://www.missingkids.com/missingkids/servlet/XmlServlet?act=rss&LanguageCountry=en_US&orgPrefix=NCMC&state=$1';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => "418 1d";

handle sub {
    # return two-letter state
    if ($loc->country_code eq 'US' && $loc->region) {
    	return $loc->region;
    }
    return;
};

1;