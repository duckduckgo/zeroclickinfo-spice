package DDG::Spice::PackageTracking;

use strict;
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
my $tracking_re = qr/package|track(?:ing|)|num(?:ber|)|\#/i;
my $strip_re = qr/$triggers_re|$carriers_re/;

# Package words
triggers query_lc => qr/^($triggers_re .+|.+ $triggers_re)$/;

# Carrier names
triggers query_lc => qr/^($carriers_re .+|.+ $carriers_re)$/;

# UPS
triggers query_nowhitespace_nodash => qr/(1Z[0-9A-Z]{16})/i;

# Fedex
triggers query_nowhitespace_nodash => qr/^([\d]{9,}).*?$|
                                         ^(\d*?)([\d]{15})$
                                        /xi;

# USPS
triggers query_nowhitespace_nodash => qr/
                                         ^([\d]{9,})$|
                                         ^([a-z]{2}\d{9}us)$|
                                         ^([\d]{20,30})$
                                        /xi;

handle query_lc => sub {

    # strip words
    s/$strip_re//g;
    trim($_);
    return unless $_;
    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[a-z\s]+$/;
    # ignore us zipcodes
    return if m/^[0-9]{5}+$/;
    # remainder should be at least 6 characters long
    return unless m/^[a-z0-9\-]{6,}$/;
    return $_;
};

1;
