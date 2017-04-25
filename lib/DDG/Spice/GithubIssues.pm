package DDG::Spice::GithubIssues;
# ABSTRACT: Search Github for Issues related to the query

use DDG::Spice;
use strict;
use warnings;
use Text::Trim;

spice is_cached => 1;
spice proxy_cache_valid => '200 1d';

spice wrap_jsonp_callback => 0;

spice to => 'https://api.github.com/search/issues?q=$1&callback={{callback}}';

my @languages = share("languages.txt")->slurp;
chomp(@languages);
my $langs = join("|", map(quotemeta, @languages));

triggers startend => 'github issue';

# Handle statement
handle query_lc => sub {
    s/github issue//;
    
    if ($_ eq "") {
        return;
    }
    
    my $query = $_;
    $query =~ s/ ($langs) |^($langs) | ($langs)$//;
    trim($query);
    
    my $lang;

    if (/ ($langs) / or /^($langs) / or / ($langs)$/) {
        $lang = $1;
        s/\s+/ /g; # Remove extra spaces
        return unless length $_;

        return "${query} language:\"${lang}\"";
    } else {
        return $query;
    }
};

1;
