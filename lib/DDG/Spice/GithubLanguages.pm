package DDG::Spice::GithubLanguages;
# ABSTRACT: Search Github for respositories by language

use DDG::Spice;

spice is_cached => 1;

name "GithubLanguages";
source "GitHub";
icon_url "https://github.com/favicon.ico";
description "Github search by language";
primary_example_queries "javascript redis", "mongodb javascript";
category "programming";
topics "programming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GithubLanguages.pm";
attribution github => ["https://github.com/joerussbowman", "Joe Bowman"],
            twitter => "joerussbowman";

my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

chomp(@triggers);
my $langs = join("|", map(quotemeta, @triggers));

spice to => 'https://api.github.com/search/repositories?q=$1&sort=stars&callback={{callback}}';

handle query_lc => sub {

    my $query = $_;
    my $l; 
    # structuring the search this way gives the first langauge specified
    # precedence. So have 'python javascript' passes the query
    # 'javascript language:python' to github.
    if (/^["' ]*($langs)/ || /\b($langs)["' ]*$/) {
        $l = $1;
    } 
    
    $query =~ s/^["']*($langs)["']*|["']*\b($langs)["']*$//;
    
    # make sure there is an actual query, and not just a language term search
    for ($query) {
        s/^\s*//; 
        s/\s*$//;
        if ($_ eq "") {
            return;
        }
    }
    
    # These is no separate language parameter for the query to 
    # Github. You specify language as a part of the raw query string
    # passed to the api like on the web form interface. 
    return "${query} language:\"${l}\"";
};

1;
