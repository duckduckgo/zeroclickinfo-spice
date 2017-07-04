package DDG::Spice::PackageTracking;

use strict;
use DDG::Spice;
use Text::Trim;
use YAML::XS 'LoadFile';

spice is_cached => 1;
spice proxy_cache_valid => "200 1m";

spice wrap_jsonp_callback => 1;

spice from => '([^/]+)/?.+?$';
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
my %courier_regex = (

    ## UPS
    # Soure: https://www.ups.com/content/ca/en/tracking/help/tracking/tnh.html
    # To Do: Some additional formats exist
    ups => qr/^
        (?:
            1Z[0-9A-Z]{16} |
            \d{9} |
            \d{12} |
            T\d{10}
        )
        $/xi,

    ## Fedex
    # Source: https://www.trackingex.com/fedex-tracking.html
    #         https://www.trackingex.com/fedexuk-tracking.html
    #         https://www.trackingex.com/fedex-poland-domestic-tracking.html
    fedex => qr/^
        \d{12,22}
        $/xi,

    ## USPS
    # Source: https://tools.usps.com/go/TrackConfirmAction!input.action
    usps => qr/^
        (?:
            (94001|92055|94073|93033|92701|92088|92021)\d{17} |
            82\d{8} |
            [A-Z]{2}\d{9}US
        )
        $/xi,

    ## Parcelforce
    # Source: http://www.parcelforce.com/help-and-advice/sending-worldwide/tracking-number-formats
    # Note:   May need to restrict pattern #3 if overtriggering
    #         https://github.com/duckduckgo/zeroclickinfo-goodies/issues/3900
    parcelforce => qr/^
        (?:
            [A-Z]{2}\d{7} |
            [A-Z]{4}\d{10} |
            [A-Z]{2}\d{9}[A-Z]{2} |
            \d{12}
        )
        $/xi,

    ## CanadaPost
    # Source: https://www.canadapost.ca/web/en/kb/details.page?article=learn_about_tracking&cattype=kb&cat=receiving&subcat=tracking
    canadapost => qr/^
        (?:
            [\d]{12} |
            [\d]{16} |
            [A-Z]{2}\d{9}CA
        )
        $/xi,

    ## DHL
    dhl => qr/^
        (?:
            \d{10} |
            \[a-zA-Z]{5}\d{10} |
            \[a-zA-Z]{3}\d{20}
        )
        $/xi,

    ##HKDK
    hkdk => qr/^
        (?:
            [a-z]{2}\d{9}(?:hk|dk)
        )
        $/xi,

    ## IPS
    ips => qr/^
        (?:
            E[MA]\d{9}(?:IN|HR)
        )
        $/xi,

    ## LaserShip
    lasership => qr/^
        (?:
            l[a-z]\d{8}
        )
        $/xi,

    ## OnTrac
    ontrac => qr/^
        (?:
            [cd]\d{14}
        )
        $/xi
);

foreach my $regex (values %courier_regex){
    triggers query_nowhitespace_nodash => $regex;
}

handle query => sub {

    # remove trigger words & carrier names
    s/\b$strip_re\b//ixg;
    trim($_);
    return unless $_;

    # remainder should be numeric or alphanumeric, not alpha
    return if m/^[A-Z\-\s]+$/i;

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


    # ignore numbers that start with 0
    return if m/^0.+/i;

    # remove spaces/dashes
    s/(\s|-)//g;

    # Validate likely UPS tracking numbers
    # Skipping \d{12} because that matches several other carriers as well
    if (m/$courier_regex{ups}/ && not m/\d{12}/) {
        return unless is_valid_ups($_);
    }
    # Validate DHL tracking numbers
    # Ensure \d{10} doesn't overlap with UPS code
    elsif (m/$courier_regex{dhl}/ && not m/82\d{8}/) {
        return unless is_valid_dhl($_);
    }


    # ignore repeated strings of single digit (e.g. 0000 0000 0000)
    return if m/^(\d)\1+$/;

    # remainder should be 6-30 characters long
    return unless m/^[A-Z0-9]{6,30}$/i;

    # ignore if isbn is present
    return if m/isbn/i;


    my @possible_couriers;
    while (my($courier, $regex) = each %courier_regex) {
        if ($_ =~ m/$regex/) {
            push(@possible_couriers, $courier);
        }
    }

    return $_, (join ',', @possible_couriers);
};


sub is_valid_dhl {
    my $package_number = $_;
    my $checksum   = 0;
    my @chars      = split( //, $package_number );
    my $length     = scalar(@chars);
    my $char_count = 0;
    my $odd_sum    = 0;
    my $even_sum   = 0;
    my $is_valid   = 0;

    foreach my $char (@chars) {
        $char_count++;
        if ($char_count % 2 == 0) {
            $even_sum += $char;
        }
        else {
            $odd_sum += $char;
        }
    }

    $even_sum *= 1;
    $odd_sum  *= 1;
    $checksum = join( '', @chars[ 0 .. $length - 2 ] ) % 7;
    $is_valid = 1 if ($checksum eq $chars[-1]);
    return $is_valid;
};

my %ups_checksum = (
    'A' => 2,
    'B' => 3,
    'C' => 4,
    'D' => 5,
    'E' => 6,
    'F' => 7,
    'G' => 8,
    'H' => 9,
    'I' => 0,
    'J' => 1,
    'K' => 2,
    'L' => 3,
    'M' => 4,
    'N' => 5,
    'O' => 6,
    'P' => 7,
    'Q' => 8,
    'R' => 9,
    'S' => 0,
    'T' => 1,
    'U' => 2,
    'V' => 3,
    'W' => 4,
    'X' => 5,
    'Y' => 6,
    'Z' => 7,
);

sub is_valid_ups {
    my $package_number = uc $_;
    my $checksum = 0;
    my $is_valid = 0;
    my @chars = split(//, $package_number);
    # Skip 1Z
    @chars = @chars[ 2 .. scalar(@chars) - 1 ];
    my $length     = scalar(@chars);
    my $char_count = 0;
    my $odd_sum    = 0;
    my $even_sum   = 0;

    foreach my $char (@chars) {
        $char_count++;

        my $tmp_num = $char;
        if ( exists $ups_checksum{$char} ) {
            $tmp_num = $ups_checksum{$char};
        }

        if ( $char_count % 2 == 0 ) {
            $even_sum += $tmp_num;
        }
        else {
            $odd_sum += $tmp_num;
        }
    }
    $even_sum *= 2;
    $checksum = ( $odd_sum + $even_sum ) % 10;
    $is_valid = 1 if ($checksum eq $chars[-1]);
    return $is_valid;
}

1;
