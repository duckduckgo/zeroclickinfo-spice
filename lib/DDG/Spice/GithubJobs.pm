package DDG::Spice::GithubJobs;
# ABSTRACT: Search for jobs on Github.

use DDG::Spice;

spice to => 'http://jobs.github.com/positions.json?description=$1&location=$2&callback={{callback}}';
spice from => '(.*?)-(.*)';

triggers query_lc => qr/(?:\s*(?:i\s+)?(?:need|want|deserve|seek|get)\s+(?:an?\s+)?)?(?:(.+)\s+)?(?:jobs?|work|employment)(?:\s+(?:in\s+)?(.+))?$/i;

handle query_lc => sub {
	if($1 && $2) {
		return $1.'-'.$2; 
	}
    if($1) {
		return $1.'-';
	}
	if($2) {
		return '-'.$2;
	}
	return;
};

1;