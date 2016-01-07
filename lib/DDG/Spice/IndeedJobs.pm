package DDG::Spice::IndeedJobs;
# ABSTRACT: Search for jobs on Indeed.
# Reviews DDG_SPICE_INDEED_JOBS_PUBLISHER environment variable
# https://ads.indeed.com/jobroll/xmlfeed

use DDG::Spice;

triggers any => "///***never trigger***///";

spice to => 'http://api.indeed.com/ads/apisearch?publisher={{ENV{DDG_SPICE_INDEED_APIKEY}}}&v=2&useragent=DuckDuckGo&userip=1.2.3.4&q=$1&l=$2&co=$3&sort=date&format=json&callback={{callback}}';
spice from => '([^/]+)/(.*?)/([^/]*)';
spice proxy_cache_valid   => "418 1d";

handle query => sub {
    return $_ if $_;
    return;
};

1;
