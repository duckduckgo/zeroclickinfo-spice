package DDG::Spice::CaniuseLists;

# ABSTRACT: Show compatibility of various features with different browsers from caniuse.com

use DDG::Spice;
use strict;
use warnings;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d'; # defaults to this automatically

spice wrap_jsonp_callback => 1; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice to => 'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';

triggers startend => 'browser compatibility', 'caniuse', 'can i use', 'browser support', 'browser compatibility list', 'browser compatibility reference';

# Handle statement
handle remainder => sub {

    return unless $_ =~ /^(?:css[23]?|html5?|svg|canvas|js api)$/i;
    return $_;
};

1;
