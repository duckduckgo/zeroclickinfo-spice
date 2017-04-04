package DDG::Spice::PackageTracking;

use strict;
use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

spice is_cached => 1;
spice proxy_cache_valid => "200 1m";

spice wrap_jsonp_callback => 1;

spice to => 'https://api.packagetrackr.com/ddg/v1/track/simple?n=$1&api_key={{ENV{DDG_SPICE_PACKAGETRACKR_API_KEY}}}';

my @carriers = sort { length $b <=> length $a } @{LoadFile(share('carriers.yml'))};
my $triggers_re = qr/package|track(ing)?|num(ber)?|shipping status|\#/ix;
my $carriers_re = join "|", @carriers;
my $strip_re = qr/$triggers_re|$carriers_re/i;

# Package words
triggers query_nowhitespace_nodash => qr/$triggers_re/i;

### Regex triggers for queries only containing a tracking number

# UPS
# Soure: https://www.ups.com/content/ca/en/tracking/help/tracking/tnh.html
# To Do: Some additional formats exist
triggers query_nowhitespace_nodash => qr/
                                        ^1Z[0-9A-Z]{16}$|
                                        ^\d{9,12}$|
                                        ^T\d{10}$
                                        /xi;

# Fedex
# Source: https://www.trackingex.com/fedex-tracking.html
#         https://www.trackingex.com/fedexuk-tracking.html
#         https://www.trackingex.com/fedex-poland-domestic-tracking.html
triggers query_nowhitespace_nodash => qr/
                                        ^\d{12,22}$
                                        /xi;

# USPS
triggers query_nowhitespace_nodash => qr/
                                        ^\d{9,30}$|
                                        ^[A-Z]{2}\d{9}US$|
                                        ^\d{20,30}$
                                        /xi;

handle query_nowhitespace_nodash => sub {
    # strip words
    s/$strip_re//ixg;
    trim($_);
    return unless $_;
    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[A-Z]+$/i;

    # remainder should be 6-30 characters long
    return unless m/^[A-Z0-9]{6,30}$/i;

    return $_;
};

1;
