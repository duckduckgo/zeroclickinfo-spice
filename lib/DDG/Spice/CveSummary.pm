package DDG::Spice::CveSummary;
# Displays a summary for a CVE.
# 
use DDG::Spice;

spice is_cached => 1;
spice to => 'http://cve.circl.lu/api/cve/$1';
spice wrap_jsonp_callback => 1;

triggers start => "cve";

handle query_lc => sub {
    return unless qr/^cve-\d{4}-\d+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
