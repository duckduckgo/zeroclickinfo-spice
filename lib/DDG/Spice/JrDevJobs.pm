package DDG::Spice::JrDevJobs;
# ABSTRACT: Search for Junior Developer Jobs from JrDevJobs.com

use DDG::Spice;

triggers start => qw(jrdevjobs);

spice to => 'https://www.jrdevjobs.com/jobs.json?query=$1';
spice is_cached => 1;
spice wrap_jsonp_callback => 1;

handle remainder => sub {
   s/(jobs)//;
   s/(job)//;
   s/(developer)//;

    return $_ if $_;
    return;
};

1;
