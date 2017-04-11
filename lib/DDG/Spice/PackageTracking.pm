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
my $triggers_re = qr/(package|parcel)|track(ing)?( num(ber)?)?|shipping status/i;
my $carriers_re = join "|", @carriers;

# allow carrier names without spaces (e.g royal mail OR royalmail)
$carriers_re =~ s/ /\\s*/g;
my $strip_re = qr/\b(?:$carriers_re|$triggers_re)\b/i;

### Regex triggers for queries containing carrier names
### or words related to pacakge tracking

# Carrier names
triggers query_lc => qr/\b(?:$carriers_re)\b/i;

# Package words
triggers query_lc => qr/^$triggers_re .+|.+ $triggers_re$/i;

### Regex triggers for queries only containing a tracking number

## UPS
# Soure: https://www.ups.com/content/ca/en/tracking/help/tracking/tnh.html
# To Do: Some additional formats exist
triggers query_nowhitespace => qr/^
                                (?:
                                    1Z[0-9A-Z]{16} |
                                    \d{9} |
                                    \d{12} |
                                    T\d{10}
                                )
                                $/xi;

## Fedex
# Source: https://www.trackingex.com/fedex-tracking.html
#         https://www.trackingex.com/fedexuk-tracking.html
#         https://www.trackingex.com/fedex-poland-domestic-tracking.html
triggers query_nowhitespace => qr/^
                                \d{12,22}
                                $/xi;

## USPS
# Source: https://tools.usps.com/go/TrackConfirmAction!input.action
triggers query_nowhitespace => qr/^
                                (?:
                                    (94001|92055|94073|93033|92701|92088|92021)\d{17} |
                                    82\d{8} |
                                    [A-Z]{2}\d{9}US
                                )
                                $/xi;

## Parcelforce
# Source: http://www.parcelforce.com/help-and-advice/sending-worldwide/tracking-number-formats
# Note:   May need to restrict pattern #3 if overtriggering
#         https://github.com/duckduckgo/zeroclickinfo-goodies/issues/3900
triggers query_nowhitespace => qr/^
                                (?:
                                    [A-Z]{2}\d{7} |
                                    [A-Z]{4}\d{10} |
                                    [A-Z]{2}\d{9}[A-Z]{2} |
                                    \d{12}
                                )
                                $/xi;

handle query => sub {

    # remove trigger words & carrier names
    s/\b$strip_re\b//ixg;
    trim($_);
    return unless $_;

    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[A-Z]+$/i;

    # ignore remainder with 2+ words
    return if m/\b[A-Z]+\s+[A-Z]+\b/i;

    # ignore phone numbers
    return if m/^(\d(-|\s))?\d{3}(-|\s)\d{3}(-|\s)\d{4}$/;
    return if m/^\d{5} \d{7}$/;
    return if m/^\d{4} \d{3} \d{3}$/;

    # ignore address lookup
    return if m/^#\d+ [A-Z\s]+$/i;

    # ignore Microsoft knowledge base codes and Luhn Check queries
    # e.g. KB2553549
    return if m/^(kb|luhn)\s?\d+/i;

    # ignore pattern: "word number word"
    # e.g. ups building 2 worldport
    return if m/\b[A-Z]+ \d{1,8} [A-Z]+\b/i;

    # remove spaces/dashes
    s/(\s|-)//g;

    # ignore repeated strings of single digit (e.g. 0000 0000 0000)
    return if m/^(\d)\1+$/;

    # remainder should be 6-30 characters long
    return unless m/^[A-Z0-9]{6,30}$/i;

    return $_;
};

1;
