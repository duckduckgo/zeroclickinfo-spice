package DDG::Spice::PackageTracking;

use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

spice is_cached => 1;
spice proxy_cache_valid => "200 1m";

spice wrap_jsonp_callback => 1;

spice to => 'https://api.packagetrackr.com/ddg/v1/track/simple?n=$1&api_key={{ENV{DDG_SPICE_PACKAGETRACKR_API_KEY}}}';

my $carriers = LoadFile(share('carriers.yml'));
my @triggers = ('package', 'track package', 'shipping status', 'package tracking', 'track');
my $triggers_re = join "|", @triggers;
my $carriers_re = join "|", @$carriers;

triggers startend => @$carriers, @triggers;

handle remainder_lc => sub {
    return unless $_;
    s/\b$triggers_re\b//g;
    s/\b$carriers_re\b//g;
    trim($_);
    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[a-z\s]+$/;
    # ignore us zipcodes
    return if m/^[0-9]{5}+$/;
    return unless m/^[a-z0-9\-]{6,}$/;
    return $_;
};

1;
