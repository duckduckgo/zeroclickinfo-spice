package DDG::Spice::Cve_summary;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development

use DDG::Spice;

spice is_cached => 1;
# API url
spice to => 'http://cve.circl.lu/api/cve/$1';
spice wrap_jsonp_callback => 1;

# Metadata.  See https://duck.co/duckduckhack/metadata for help in filling out this section.
name "Cve_summary";
source "http://cve.circl.lu";
#icon_url "";
description "Displays a short summary of a Common Vulnerabilities and Exposures (CVE).";
primary_example_queries "CVE-2016-0815";
#secondary_example_queries "optional -- demonstrate any additional triggers";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#category
category "reference";
# Uncomment and complete: https://duck.co/duckduckhack/metadata#topics
# topics "";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Cve_summary.pm";
attribution github => ["GitHubAccount", "MoriTanosuke"],
            twitter => "carsten_r";

# Triggers
triggers any => "cve";

# Handle statement
handle remainder => sub {

    # optional - regex guard
    # return unless qr/^\w+/;

    return unless $_;    # Guard against "no answer"

    return $_;
};

1;
