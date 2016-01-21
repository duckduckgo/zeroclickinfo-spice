package DDG::Spice::PackageTracking;

use DDG::Spice;
use YAML::XS 'LoadFile';

spice is_cached => 1;
spice proxy_cache_valid => "200 1d";

spice wrap_jsonp_callback => 1;

spice to => 'https://api.packagetrackr.com/ddg/v1/track/simple?n=$1&api_key={{ENV{DDG_SPICE_PACKAGETRACKR_API_KEY}}}';

my $carriers = LoadFile(share('carriers.yml'));

triggers any => @$carriers, 'package', 'track package', 'shipping status', 'package tracking';

handle remainder => sub {
    return $_ if $_;
    
    return;
};

1;
