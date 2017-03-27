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

# Carrier names
triggers query_nowhitespace_nodash => qr/$carriers_re/i;

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

handle query_nowhitespace_nodash => sub {
    # strip words
    s/$strip_re//ixg;
    trim($_);
    return unless $_;
    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[A-Z]+$/i;
    # remainder should be at least 6 characters long
    return unless m/^[A-Z0-9]{6,}$/i;
    return $_;
};

1;
