package DDG::Spice::CouponsSparheld_DE;

# ABSTRACT: Returns coupon codes for various online-shops from sparheld.de

use DDG::Spice;

# Attribution
name "Coupons Sparheld.de";
source "www.sparheld.de";
description "Get rebate codes from www.sparheld.de";
attribution github => ['https://github.com/meingutscheincode/zeroclickinfo-spice','Sparheld International GmbH'];
primary_example_queries "gutschein zalando";
secondary_example_queries "gutschein h&m";


# Caching - https://duck.co/duckduckhack/spice_advanced_backend#caching-api-responses
spice is_cached => 0;
spice proxy_cache_valid => "200 2h"; # max 2 hours to keep the number of expired coupons as low as possible

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

# API endpoint - https://duck.co/duckduckhack/spice_attributes#spice-codetocode
spice to => 'http://api.sparheld.de/partnerAPI/v1?uid=5641ae4cdf06b&format=json&dataKey=coupons&queryString=$1';

# Triggers - https://duck.co/duckduckhack/spice_triggers
triggers any => 'gutschein', 'gutschein code', 'gutscheincode', 'gutscheine', 'aktions code', 'aktionscode', 'gutschein rabatt', 'gutscheinnummer', 'promotion nummer', 'rabatt', 'rabatt code', 'rabattcode', 'vorteilscode', 'rabattnummer', 'vorteilsnummer', 'rabatt gutschein', 'rabattgutschein';

# Handle statement
handle remainder => sub {

    # Query is in $_...if you need to do something with it before returning
    return $_;
};

1;
