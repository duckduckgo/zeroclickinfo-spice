package DDG::Spice::SearchCode;
# ABSTRACT: Searches for programming code

use strict;
use DDG::Spice;

# known bad queries
my %skip_queries = map { $_ => undef } (
    'sql server with',
);

my @triggers = share('triggers.txt')->slurp;
triggers startend => @triggers;

spice to => 'https://searchcode.com/api/jsonp_search_IV/?q=$1&callback={{callback}}';

# use list of trigger words to create regex
# and strip newline characters
my $words = join "|", @triggers;
$words =~ s/\n//g;

handle query_raw => sub {
        return if exists $skip_queries{lc($_)};

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
