package DDG::Spice::GithubJobs;
# ABSTRACT: Search for jobs on Github.

use DDG::Spice;

triggers any => "job", "jobs";

primary_example_queries  => "javascript jobs";
secondary_example_queries => "perl jobs in san francisco";
description "Github jobs";
name "GithubJobs";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GithubJobs.pm";
topics => "programming", "special interest";
category => "programming";
spice to => 'https://jobs.github.com/positions.json?description=$1&location=$2&callback={{callback}}';
spice from => '(.*?)-(.*)';
attribution github => ['https://github.com/jagtalon','jagtalon'],
            twitter => ['http://twitter.com/juantalon','juantalon'];

handle query_lc => sub {
    if (/(?:\s*(?:i\s+|we\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)(?:jobs?|work|employment|internship)(?:\s+(?:in\s+)?(.+))?$/i) {
        if($1 && $2) {
            return $1.'-'.$2; 
        }
        if($1) {
            return $1.'-';
        }
        if($2) {
            return '-'.$2;
        }
    }
	return;
};

1;
