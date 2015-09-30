package DDG::Spice::IndeedJobs;
# ABSTRACT: Search for jobs on Indeed.
# Reviews DDG_SPICE_INDEED_JOBS_PUBLISHER environment variable
# https://ads.indeed.com/jobroll/xmlfeed

use DDG::Spice;

primary_example_queries "java jobs";
secondary_example_queries "perl jobs in san francisco";
description "Indeed jobs";
name "Indeed Jobs";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/IndeedJobs.pm";
topics "special_interest";
category  "reference";
attribution github  => ['parker', 'Parker'],
            twitter => ['pseidel', 'Parker'],
            github  => ['tagawa', 'Daniel Davis'],
            twitter => ['ourmaninjapan', 'Daniel Davis'],
            web     => ['http://daniemon.com/', 'Daniel Davis'];

triggers any => "///***never trigger***///";

spice to => 'http://api.indeed.com/ads/apisearch?publisher={{ENV{DDG_SPICE_INDEED_APIKEY}}}&v=2&useragent=DuckDuckGo&userip=1.2.3.4&q=$1&l=$2&co=$3&sort=date&format=json&callback={{callback}}';
spice from => '([^/]+)/(.*?)/([^/]*)';
spice proxy_cache_valid   => "418 1d";

handle query => sub {
    return $_ if $_;
    return;
};

1;