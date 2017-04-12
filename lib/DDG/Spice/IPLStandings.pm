package DDG::Spice::IPLStandings;

# ABSTRACT: Write an abstract here

# Start at http://docs.duckduckhack.com/walkthroughs/forum-lookup.html if you are new
# to instant answer development

use DDG::Spice;
use strict;
use warnings;
use Data::Dumper;

spice is_cached => 1;
spice proxy_cache_valid => '200 5m';

spice wrap_jsonp_callback => 0; # only enable for non-JSONP APIs (i.e. no &callback= parameter)

spice to => 'http://datacdn.iplt20.com/dynamic/data/core/cricket/2012/ipl2017/groupStandings.js?callback={{calback}}';
triggers any => 'ipl', 'ipl point table', 'indian premier league';

# Handle statement
handle remainder => sub {
    my ($result) = @_;
    return $result;
};

1;
