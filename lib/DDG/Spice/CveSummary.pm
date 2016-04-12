package DDG::Spice::CveSummary;
# Displays a summary for a CVE.
# 
use DDG::Spice;

spice is_cached => 1;
spice to => 'https://cve.circl.lu/api/cve/$1';
spice wrap_jsonp_callback => 1;

triggers start => "cve";

handle query_lc => sub {
    return unless $_ =~ qr/^cve-\d{4}-\d{4}/s; # match specific CVE pattern

    return unless $_;    # Guard against "no answer"

    return uc $_;
};

1;
