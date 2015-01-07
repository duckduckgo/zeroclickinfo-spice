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
my $langs = join("|", @triggers);

spice to => 'https://api.github.com/search/repositories?q=$1&sort=stars&callback={{callback}}';

handle query_lc => sub {

    my $query = $_;
    my $l; 
    if ($query =~ /^($langs)\b/ || $query =~ /\b($langs)$/) {
        $l = $1;
    } 
    
    $query =~ s/^($langs)\b|\b($langs)$//;

    return "$query language:\"$l\"";
};

1;
