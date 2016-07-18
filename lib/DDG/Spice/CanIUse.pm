package DDG::Spice::CanIUse;

# ABSTRACT: Show compatibility of various features in different browsers with data from caniuse.com

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice to => 'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';

triggers any => 'browser compatibility', 'caniuse', 'can i use';

# Handle statement
handle remainder => sub {

    return unless $_ =~ /css[2-3]?|html5|svg|canvas|js api/i;
    return \$_;
};

1;
