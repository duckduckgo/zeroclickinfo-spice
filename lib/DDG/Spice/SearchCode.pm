package DDG::Spice::SearchCode;

use DDG::Spice;
use File::Slurp;

name "SearchCode";
description "search through APIs and open source repositories";
source "Search[code]";
primary_example_queries "underscore.js bind";
secondary_example_queries "php print_r";
category "reference";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/SearchCode.pm";
icon_url "/i/searchco.de.ico";
attribution twitter => ["https://twitter.com/boyter", "boyter"],
			github => ["https://github.com/boyter", "Ben Boyter"];

# known bad queries
my %skip_queries = map { $_ => undef } (
    'sql server with',
);

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

spice to => 'http://searchco.de/api/jsonp_search_IV/?q=$1&callback={{callback}}';

# use list of trigger words to create regex
# and strip newline characters
my $words = join "|", @triggers;
$words =~ s/\n//g;

handle query_raw => sub {
        return if exists $skip_queries{$_};

	# don't trigger on:
	# app (for Quixey)
	# code/example (for CodeSearch)
	# jobs (for Github jobs)
	return if m/(^|\s+)(app|code|example|jobs)(\s+|$)/ig;

	# make sure there is more to the
	# query besides the trigger itself
	if (m/$words/i){
		my $query = $_;
		s/$words//ig;
		return $query if length $_ > 1;
	}
	return;
};

1;
