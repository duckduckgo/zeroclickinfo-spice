package DDG::Spice::JrDevJobs;
# ABSTRACT: Search for Junior Developer Jobs.

use DDG::Spice;

trigger any => 'junior developer jobs', 'jobs for jr developer', 'entry level software jobs';

spice to => 'https://www.jrdevjobs.com/jobs.rss?query=$1'

handle query => sub {
    return $_ if $_;
    return;
};

1;

