package DDG::Spice::LaunchLibrary;
# ABSTRACT: List upcoming rocket launches and where to watch them online

use strict;
use DDG::Spice;

spice is_cached => 1;

# Version 1.1 of the API allows GET requests.
# Parameters are included in the URL path; "/next/10" shows the next 10 launches
# See launchlibrary.net for the API reference.
spice to => 'http://launchlibrary.net/1.1/launch/next/10';
spice wrap_jsonp_callback => 1;

triggers any => "rocket launches", "rocket launch", "space launches", "space launch";

handle query_lc => sub {
    return unless $_ =~ /^(watch|upcoming|next|future)+\s?(a)*\s*(space|rocket)\s?launch(es)*\s?(schedule|webcast)*$/;
    return 1;
};

1;
