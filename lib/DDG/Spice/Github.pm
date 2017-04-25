package DDG::Spice::Github;
# ABSTRACT: Search for information about GitHub repositories

use strict;
use DDG::Spice;
use Text::Trim;

triggers startend => "github";

my @triggers = share("triggers.txt")->slurp;
triggers startend => "github";

chomp(@triggers);
my $langs = join("|", map(quotemeta, @triggers));

spice to => 'https://api.github.com/search/repositories?q=$1&sort=stars&callback={{callback}}';

spice proxy_cache_valid => '200 1d';

handle query_lc => sub {
    s/^github\s*|\s+github$//;
    if ($_ eq "" || m/\bjobs\b|\bstatus\b|\bissue\b/) {
        return;
    }

    my $query = $_;
    my $l;
    # can't use standard \b word boundary here. It will fail for languages with characters like c++
    if (/ ($langs) / or /^($langs) / or / ($langs)$/) {
        $l = $1;
        $query =~ s/ ($langs) |^($langs) | ($langs)$//;

        # make sure there is an actual query, and not just a language term search
        trim($query);  # need to add `use String::Trim`
        s/\s+/ /g;     # squash down multiple spaces
        return unless length $_;

        # These is no separate language parameter for the query to
        # Github. You specify language as a part of the raw query string
        # passed to the api like on the web form interface.
        return "${query} language:\"${l}\"" unless /^jobs\b|\bjobs$|^status\b|\bstatus$|^issue\b|\bissue$/;
    }
};
1;
